<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type { OnActionClickParams, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { HuanxingUserResult } from '#/api/huanxing/user';

import { ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getHuanxingUserListApi,
  createHuanxingUserApi,
  updateHuanxingUserApi,
  deleteHuanxingUserApi,
} from '#/api/huanxing/user';
import { querySchema, useColumns, formSchema } from './data';

defineOptions({ name: 'HuanxingUser' });

const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: { content: $t('common.form.query') },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<HuanxingUserResult> = {
  rowConfig: { keyField: 'id' },
  checkboxConfig: { highlight: true },
  height: 'auto',
  exportConfig: {},
  printConfig: {},
  toolbarConfig: {
    export: true, print: true, refresh: true,
    refreshOptions: { code: 'query' },
    custom: true, zoom: true,
  },
  columns: useColumns(onActionClick),
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getHuanxingUserListApi({
          page: page.currentPage,
          size: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

function onRefresh() { gridApi.query(); }

function onActionClick({ code, row }: OnActionClickParams<HuanxingUserResult>) {
  switch (code) {
    case 'delete': {
      deleteHuanxingUserApi([row.id]).then(() => {
        message.success($t('ui.actionMessage.deleteSuccess', [row.id]));
        onRefresh();
      });
      break;
    }
    case 'edit': {
      editId.value = row.id;
      editModalApi.setData(row).open();
      break;
    }
  }
}

const editId = ref<number>(0);

const [EditForm, editFormApi] = useVbenForm({ showDefaultActions: false, schema: formSchema });
const [editModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (valid) {
      editModalApi.lock();
      const data = await editFormApi.getValues();
      try {
        await updateHuanxingUserApi(editId.value, data);
        message.success($t('ui.actionMessage.operationSuccess'));
        await editModalApi.close();
        onRefresh();
      } finally { editModalApi.unlock(); }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = editModalApi.getData<HuanxingUserResult>();
      editFormApi.resetForm();
      if (data) editFormApi.setValues(data);
    }
  },
});

const [AddForm, addFormApi] = useVbenForm({ showDefaultActions: false, schema: formSchema });
const [addModal, addModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await addFormApi.validate();
    if (valid) {
      addModalApi.lock();
      const data = await addFormApi.getValues();
      try {
        await createHuanxingUserApi(data);
        message.success($t('ui.actionMessage.operationSuccess'));
        await addModalApi.close();
        onRefresh();
      } finally { addModalApi.unlock(); }
    }
  },
  onOpenChange(isOpen: boolean) { if (isOpen) addFormApi.resetForm(); },
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton @click="() => addModalApi.setData(null).open()">
          <MaterialSymbolsAdd class="size-5" />
          添加
        </VbenButton>
      </template>
    </Grid>
    <editModal title="编辑唤星用户" :fullscreen-button="false" class="w-[800px]">
      <EditForm />
    </editModal>
    <addModal title="添加唤星用户" :fullscreen-button="false" class="w-[800px]">
      <AddForm />
    </addModal>
  </Page>
</template>
