import { PlusOutlined } from '@ant-design/icons';
import {
  type ActionType,
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import type { FC } from 'react';

// Conditional import for Storybook compatibility
let addRule: any;
if (process.env.STORYBOOK === 'true') {
  addRule = require('../service.storybook').addRule;
} else {
  addRule = require('@/services/ant-design-pro/api').addRule;
}

// Conditional import for FormattedMessage, useIntl, and useRequest
let FormattedMessage: any, useIntl: any, useRequest: any;
if (process.env.STORYBOOK === 'true') {
  ({ FormattedMessage, useIntl, useRequest } = require('../umijsMax.mock'));
} else {
  ({ FormattedMessage, useIntl, useRequest } = require('@umijs/max'));
}

interface CreateFormProps {
  reload?: ActionType['reload'];
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const { reload } = props;

  const [messageApi, contextHolder] = message.useMessage();
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const { run, loading } = useRequest(addRule, {
    manual: true,
    onSuccess: () => {
      messageApi.success('Added successfully');
      reload?.();
    },
    onError: () => {
      messageApi.error('Adding failed, please try again!');
    },
  });

  return (
    <>
      {contextHolder}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>
        }
        width="400px"
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          await run({ data: value as API.RuleListItem });

          return true;
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
    </>
  );
};

export default CreateForm;
