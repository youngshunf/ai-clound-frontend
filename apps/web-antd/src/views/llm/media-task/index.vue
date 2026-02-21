<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type {
  VxeTableGridOptions,
  OnActionClickParams,
} from '#/adapter/vxe-table';
import type { LlmMediaTaskResult } from '#/api';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getLlmMediaTaskListApi, deleteLlmMediaTaskApi } from '#/api';
import { querySchema, useColumns } from './data';

const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: { content: $t('common.form.query') },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<LlmMediaTaskResult> = {
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
        return await getLlmMediaTaskListApi({
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

function onActionClick({
  code,
  row,
}: OnActionClickParams<LlmMediaTaskResult>) {
  switch (code) {
    case 'delete': {
      deleteLlmMediaTaskApi(row.id).then(() => {
        message.success($t('ui.actionMessage.deleteSuccess', [row.task_id]));
        onRefresh();
      });
      break;
    }
  }
}
</script>

<template>
  <Page auto-content-height>
    <Grid />
  </Page>
</template>
