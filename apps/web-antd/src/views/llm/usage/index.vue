<!--
  用量统计页面
  @author Ysf
-->
<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { LlmUsageLogResult, LlmUsageSummary, LlmDailyUsage } from '#/api';

import { ref, onMounted, h } from 'vue';
import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { Card, Row, Col, Statistic } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getLlmUsageSummaryApi,
  getLlmDailyUsageApi,
  getLlmUsageLogsApi,
} from '#/api';
import { querySchema, useLogColumns } from './data';

const summary = ref<LlmUsageSummary>({
  total_requests: 0,
  success_requests: 0,
  error_requests: 0,
  total_tokens: 0,
  total_input_tokens: 0,
  total_output_tokens: 0,
  total_cost: 0,
  avg_latency_ms: 0,
});

const dailyUsage = ref<LlmDailyUsage[]>([]);

const fetchSummary = async () => {
  try {
    summary.value = await getLlmUsageSummaryApi();
  } catch (error) {
    console.error(error);
  }
};

const fetchDailyUsage = async () => {
  try {
    dailyUsage.value = await getLlmDailyUsageApi(30);
  } catch (error) {
    console.error(error);
  }
};

const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: { content: $t('common.form.query') },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<LlmUsageLogResult> = {
  rowConfig: { keyField: 'id' },
  height: 800,
  exportConfig: {},
  toolbarConfig: {
    export: true,
    refresh: true,
    custom: true,
    zoom: true,
  },
  columns: useLogColumns(),
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const params: Record<string, any> = {
          page: page.currentPage,
          size: page.pageSize,
          ...formValues,
        };
        if (formValues?.dateRange?.length === 2) {
          params.start_date = formValues.dateRange[0];
          params.end_date = formValues.dateRange[1];
          delete params.dateRange;
        }
        return await getLlmUsageLogsApi(params);
      },
    },
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });

const successRate = () => {
  if (summary.value.total_requests === 0) return '0%';
  return (
    ((summary.value.success_requests / summary.value.total_requests) * 100).toFixed(1) + '%'
  );
};

onMounted(() => {
  fetchSummary();
  fetchDailyUsage();
});
</script>

<template>
  <Page auto-content-height>
    <div class="mb-4">
      <Row :gutter="16">
        <Col :span="6">
          <Card>
            <Statistic
              title="总请求数"
              :value="summary.total_requests"
              :value-style="{ color: '#1890ff' }"
            />
          </Card>
        </Col>
        <Col :span="6">
          <Card>
            <Statistic
              title="成功率"
              :value="successRate()"
              :value-style="{ color: '#52c41a' }"
            />
          </Card>
        </Col>
        <Col :span="6">
          <Card>
            <Statistic
              title="总 Tokens"
              :value="summary.total_tokens"
              :value-style="{ color: '#722ed1' }"
            />
          </Card>
        </Col>
        <Col :span="6">
          <Card>
            <Statistic
              title="总费用"
              :value="summary.total_cost"
              :precision="4"
              prefix="$"
              :value-style="{ color: '#fa8c16' }"
            />
          </Card>
        </Col>
      </Row>
    </div>

    <div class="mb-4">
      <Row :gutter="16">
        <Col :span="6">
          <Card>
            <Statistic
              title="输入 Tokens"
              :value="summary.total_input_tokens"
            />
          </Card>
        </Col>
        <Col :span="6">
          <Card>
            <Statistic
              title="输出 Tokens"
              :value="summary.total_output_tokens"
            />
          </Card>
        </Col>
        <Col :span="6">
          <Card>
            <Statistic
              title="平均延迟"
              :value="summary.avg_latency_ms"
              suffix="ms"
            />
          </Card>
        </Col>
        <Col :span="6">
          <Card>
            <Statistic
              title="错误请求"
              :value="summary.error_requests"
              :value-style="{ color: summary.error_requests > 0 ? '#ff4d4f' : '#52c41a' }"
            />
          </Card>
        </Col>
      </Row>
    </div>

    <Card title="调用日志" class="mt-4">
      <Grid />
    </Card>
  </Page>
</template>
