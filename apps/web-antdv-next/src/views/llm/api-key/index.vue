<!--
  API Key管理页面
  @author Ysf
-->
<script setup lang="ts">
import type { VxeTableGridOptions, OnActionClickParams } from '#/adapter/vxe-table';
import type {
  LlmApiKeyResult,
  LlmApiKeyCreateParams,
  LlmRateLimitResult,
  LlmModelConfigResult,
} from '#/api';

import { ref, onMounted } from 'vue';
import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';
import { message, Modal, Typography } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getLlmApiKeyListApi,
  createLlmApiKeyApi,
  updateLlmApiKeyApi,
  deleteLlmApiKeyApi,
  getLlmRateLimitListApi,
  getAvailableModelsApi,
} from '#/api';
import { useColumns, useFormSchema, useEditFormSchema } from './data';

const rateLimitOptions = ref<LlmRateLimitResult[]>([]);
const modelOptions = ref<LlmModelConfigResult[]>([]);

const fetchOptions = async () => {
  try {
    const [rateLimits, models] = await Promise.all([
      getLlmRateLimitListApi({ enabled: true }),
      getAvailableModelsApi(),
    ]);
    rateLimitOptions.value = rateLimits;
    modelOptions.value = models;
  } catch (error) {
    console.error(error);
  }
};

const gridOptions: VxeTableGridOptions<LlmApiKeyResult> = {
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
      query: async () => {
        return await getLlmApiKeyListApi();
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

function onRefresh() {
  gridApi.query();
}

const editId = ref<number>(0);

function onActionClick({ code, row }: OnActionClickParams<LlmApiKeyResult>) {
  switch (code) {
    case 'delete': {
      deleteLlmApiKeyApi(row.id).then(() => {
        message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
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
  schema: useEditFormSchema(rateLimitOptions, modelOptions),
});

const [editModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (valid) {
      editModalApi.lock();
      const data = await editFormApi.getValues<LlmApiKeyCreateParams & { status?: string }>();
      try {
        await updateLlmApiKeyApi(editId.value, data);
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
      const data = editModalApi.getData<LlmApiKeyResult>();
      editFormApi.resetForm();
      if (data) {
        editFormApi.setValues(data);
      }
    }
  },
});

const [AddForm, addFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: useFormSchema(rateLimitOptions, modelOptions),
});

const [addModal, addModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await addFormApi.validate();
    if (valid) {
      addModalApi.lock();
      const data = await addFormApi.getValues<LlmApiKeyCreateParams>();
      try {
        const result = await createLlmApiKeyApi(data);
        await addModalApi.close();
        // 显示生成的 API Key
        Modal.success({
          title: 'API Key 创建成功',
          content: () => {
            return [
              Typography.Paragraph({}, '请妥善保存以下 API Key，它只会显示一次：'),
              Typography.Paragraph(
                { copyable: true, code: true },
                result.api_key,
              ),
            ];
          },
          width: 500,
        });
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

onMounted(() => {
  fetchOptions();
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton @click="() => addModalApi.open()">
          <MaterialSymbolsAdd class="size-5" />
          创建 API Key
        </VbenButton>
      </template>
    </Grid>
    <editModal title="编辑 API Key">
      <EditForm />
    </editModal>
    <addModal title="创建 API Key">
      <AddForm />
    </addModal>
  </Page>
</template>
