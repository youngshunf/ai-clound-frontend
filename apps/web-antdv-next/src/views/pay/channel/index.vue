<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type { OnActionClickParams, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { PayChannel } from '#/api/pay/channel';

import { ref } from 'vue';
import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';
import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getPayChannelListApi,
  createPayChannelApi,
  updatePayChannelApi,
  deletePayChannelApi,
} from '#/api/pay/channel';
import { querySchema, useColumns, formSchema } from './data';

const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: { content: '查询' },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<PayChannel> = {
  rowConfig: { keyField: 'id' },
  height: 'auto',
  toolbarConfig: { refresh: true, custom: true, zoom: true },
  columns: useColumns(onActionClick),
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) =>
        await getPayChannelListApi({
          page: page.currentPage,
          size: page.pageSize,
          ...formValues,
        }),
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
const editId = ref(0);

function onRefresh() { gridApi.query(); }

function onActionClick({ code, row }: OnActionClickParams<PayChannel>) {
  if (code === 'delete') {
    deletePayChannelApi([row.id]).then(() => {
      message.success('删除成功');
      onRefresh();
    });
  }
  if (code === 'edit') {
    editId.value = row.id;
    editModalApi.setData({ ...row }).open();
  }
}

const [EditForm, editFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: formSchema,
});

const [editModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (!valid) return;
    editModalApi.lock();
    const raw = await editFormApi.getValues();
    // 组装 extra_config 嵌套字段
    const extraConfig: Record<string, any> = {};
    const data: Record<string, any> = {};
    for (const [key, value] of Object.entries(raw)) {
      if (key.startsWith('extra_config.')) {
        const subKey = key.slice('extra_config.'.length);
        if (value != null && value !== '') extraConfig[subKey] = value;
      } else {
        data[key] = value;
      }
    }
    if (Object.keys(extraConfig).length > 0) {
      data.extra_config = extraConfig;
    }
    try {
      if (editId.value) await updatePayChannelApi(editId.value, data);
      else await createPayChannelApi(data as any);
      message.success('操作成功');
      await editModalApi.close();
      onRefresh();
    } finally {
      editModalApi.unlock();
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      editFormApi.resetForm();
      const data = editModalApi.getData<any>();
      if (data) {
        // 展平 extra_config 嵌套数据 → extra_config.xxx 格式
        const flatData: Record<string, any> = { ...data };
        if (data.extra_config && typeof data.extra_config === 'object') {
          for (const [key, value] of Object.entries(data.extra_config)) {
            flatData[`extra_config.${key}`] = value;
          }
        }
        editFormApi.setValues(flatData);
      }
    }
  },
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton @click="() => { editId = 0; editModalApi.open(); }">
          <MaterialSymbolsAdd class="size-5" />
          新增渠道
        </VbenButton>
      </template>
    </Grid>
    <editModal :title="editId ? '编辑渠道' : '新增渠道'" class="w-[600px]">
      <EditForm />
    </editModal>
  </Page>
</template>
