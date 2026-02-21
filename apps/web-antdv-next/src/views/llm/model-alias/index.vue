<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type { VxeTableGridOptions, OnActionClickParams } from '#/adapter/vxe-table';
import type { LlmModelAliasResult, LlmModelAliasCreateParams } from '#/api';

import { ref } from 'vue';
import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';
import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getLlmModelAliasListApi,
  createLlmModelAliasApi,
  updateLlmModelAliasApi,
  deleteLlmModelAliasApi,
} from '#/api';
import { querySchema, useColumns, useFormSchema } from './data';

const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: { content: $t('common.form.query') },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<LlmModelAliasResult> = {
  rowConfig: { keyField: 'id' },
  height: 'auto',
  exportConfig: {},
  toolbarConfig: {
    export: true,
    refresh: true,
    custom: true,
    zoom: true,
  },
  columns: useColumns(onActionClick),
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getLlmModelAliasListApi({
          page: page.currentPage,
          size: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

function onRefresh() {
  gridApi.query();
}

const editId = ref<number>(0);

function onActionClick({ code, row }: OnActionClickParams<LlmModelAliasResult>) {
  switch (code) {
    case 'delete': {
      deleteLlmModelAliasApi(row.id).then(() => {
        message.success($t('ui.actionMessage.deleteSuccess', [row.alias_name]));
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

const [EditForm, editFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: useFormSchema(),
});

const [editModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (valid) {
      editModalApi.lock();
      const data = await editFormApi.getValues<LlmModelAliasCreateParams>();
      try {
        await updateLlmModelAliasApi(editId.value, data);
        message.success($t('ui.actionMessage.operationSuccess'));
        await editModalApi.close();
        onRefresh();
      } finally {
        editModalApi.unlock();
      }
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = editModalApi.getData<LlmModelAliasResult>();
      editFormApi.resetForm();
      if (data) {
        editFormApi.setValues(data);
      }
    }
  },
});

const [AddForm, addFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: useFormSchema(),
});

const [addModal, addModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await addFormApi.validate();
    if (valid) {
      addModalApi.lock();
      const data = await addFormApi.getValues<LlmModelAliasCreateParams>();
      try {
        await createLlmModelAliasApi(data);
        message.success($t('ui.actionMessage.operationSuccess'));
        await addModalApi.close();
        onRefresh();
      } finally {
        addModalApi.unlock();
      }
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      addFormApi.resetForm();
    }
  },
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton @click="() => addModalApi.open()">
          <MaterialSymbolsAdd class="size-5" />
          添加映射
        </VbenButton>
      </template>
    </Grid>
    <editModal title="编辑模型映射">
      <EditForm />
    </editModal>
    <addModal title="添加模型映射">
      <AddForm />
    </addModal>
  </Page>
</template>
