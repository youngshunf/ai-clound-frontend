<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { CreateIndustryParams, Industry } from '#/api/topic';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';

import { message, Modal } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createIndustryApi,
  deleteIndustryApi,
  getIndustryTreeApi,
  initIndustryDataApi,
  updateIndustryApi,
} from '#/api/topic';

import { addSchema, editSchema, querySchema, useColumns } from './data';

const formOptions: VbenFormProps = {
  collapsed: false,
  schema: querySchema,
  submitButtonOptions: {
    content: '查询',
  },
};

const gridOptions: VxeTableGridOptions<Industry> = {
  columns: useColumns(onActionClick),
  height: 'auto',
  keepSource: true,
  pagerConfig: {
    enabled: false, // 树形结构通常不分页
  },
  proxyConfig: {
    ajax: {
      query: async () => {
        return await getIndustryTreeApi();
      },
    },
  },
  treeConfig: {
    rowField: 'id',
    parentField: 'parent_id',
    expandAll: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

function onActionClick({ code, row }: OnActionClickParams<Industry>) {
  if (code === 'edit') {
    handleEdit(row);
  } else if (code === 'delete') {
    handleDelete(row);
  }
}

const expandAll = () => {
  gridApi.grid?.setAllTreeExpand(true);
};

const collapseAll = () => {
  gridApi.grid?.setAllTreeExpand(false);
};

const [Form, formApi] = useVbenForm({
  schema: addSchema,
  showDefaultActions: false,
});

const [ModalComponent, modalApi] = useVbenModal({
  fullscreenButton: false,
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) return;

    const values = await formApi.getValues();
    const isEdit = modalApi.getData()?.isEdit;
    const id = modalApi.getData()?.id;

    try {
      modalApi.setState({ loading: true });
      if (isEdit) {
        await updateIndustryApi(id, values as CreateIndustryParams);
        message.success('更新成功');
      } else {
        await createIndustryApi(values as CreateIndustryParams);
        message.success('创建成功');
      }
      modalApi.close();
      gridApi.reload();
    } catch (error) {
      console.error(error);
    } finally {
      modalApi.setState({ loading: false });
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData();
      if (data?.isEdit) {
        formApi.setValues(data.record);
        modalApi.setState({ title: '编辑行业' });
      } else {
        formApi.resetForm();
        modalApi.setState({ title: '新增行业' });
      }
    }
  },
});

function handleAdd() {
  modalApi.setData({ isEdit: false });
  modalApi.open();
}

function handleEdit(row: Industry) {
  modalApi.setData({ isEdit: true, id: row.id, record: row });
  modalApi.open();
}

function handleDelete(row: Industry) {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除行业 "${row.name}" 吗？如果包含子行业也会被删除。`,
    onOk: async () => {
      await deleteIndustryApi(row.id);
      message.success('删除成功');
      gridApi.reload();
    },
  });
}

async function handleInit() {
  try {
    await initIndustryDataApi();
    message.success('初始化数据成功');
    gridApi.reload();
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton type="primary" @click="handleAdd">
          <template #icon>
            <MaterialSymbolsAdd />
          </template>
          新增行业
        </VbenButton>
        <VbenButton class="ml-2" @click="handleInit">
          初始化预设数据
        </VbenButton>
      </template>
      <template #toolbar-tools>
        <VbenButton class="mr-2" @click="expandAll">
          展开全部
        </VbenButton>
        <VbenButton @click="collapseAll">
          折叠全部
        </VbenButton>
      </template>
    </Grid>
    <ModalComponent>
      <Form />
    </ModalComponent>
  </Page>
</template>
