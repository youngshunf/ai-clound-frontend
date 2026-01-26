<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { Topic } from '#/api/topic';

import { Page, VbenButton } from '@vben/common-ui';
import { Tag } from 'ant-design-vue';
import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  adoptTopicApi,
  generateDailyTopicsApi,
  getTopicRecommendationsApi,
  ignoreTopicApi,
} from '#/api/topic';

import { querySchema, useColumns } from './data';

const formOptions: VbenFormProps = {
  collapsed: false,
  schema: querySchema,
  submitButtonOptions: {
    content: '查询',
  },
};

const gridOptions: VxeTableGridOptions<Topic> = {
  columns: useColumns,
  height: 'auto',
  pagerConfig: {
    enabled: true,
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getTopicRecommendationsApi({
          page: page.currentPage,
          size: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

async function handleGenerate() {
  try {
    message.loading({ content: '正在生成选题，请稍候...', key: 'generate' });
    const res = await generateDailyTopicsApi();
    message.success({
      content: `生成完成！成功: ${res.generated} 条，失败: ${res.errors.length} 条`,
      key: 'generate',
    });
    gridApi.reload();
  } catch (error) {
    message.error({ content: '生成失败', key: 'generate' });
    console.error(error);
  }
}

async function handleAdopt(row: Topic) {
  try {
    await adoptTopicApi(row.id);
    message.success('已采纳选题');
    gridApi.reload();
  } catch (error) {
    console.error(error);
  }
}

async function handleIgnore(row: Topic) {
  try {
    await ignoreTopicApi(row.id);
    message.success('已忽略选题');
    gridApi.reload();
  } catch (error) {
    console.error(error);
  }
}

const getPlatformColor = (platform: string) => {
  const map: Record<string, string> = {
    '小红书': 'red',
    '抖音': 'black',
    'B站': 'pink',
    '微博': 'orange',
  };
  return map[platform] || 'blue';
};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton type="primary" @click="handleGenerate">
          手动触发生成
        </VbenButton>
      </template>

      <template #keywords="{ row }">
        <Tag v-for="tag in row.keywords" :key="tag" color="blue" class="mb-1 mr-1">
          {{ tag }}
        </Tag>
      </template>

      <template #platform_heat="{ row }">
        <div v-if="row.platform_heat">
          <Tag
            v-for="(score, platform) in row.platform_heat"
            :key="platform"
            :color="getPlatformColor(platform)"
            class="mb-1 mr-1"
          >
            {{ platform }}: {{ score }}
          </Tag>
        </div>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status === 0" color="default">待选</Tag>
        <Tag v-else-if="row.status === 1" color="success">已采纳</Tag>
        <Tag v-else-if="row.status === 2" color="error">已忽略</Tag>
      </template>

      <template #action="{ row }">
        <div v-if="row.status === 0">
          <VbenButton type="link" size="small" @click="handleAdopt(row)">
            采纳
          </VbenButton>
          <VbenButton type="link" danger size="small" @click="handleIgnore(row)">
            忽略
          </VbenButton>
        </div>
      </template>
    </Grid>
  </Page>
</template>
