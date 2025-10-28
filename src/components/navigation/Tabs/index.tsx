import * as React from 'react';

import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';

import styles from './index.module.css';

type Props = {
  tabs: {
    key: string;
    title: string;
    content: React.ReactNode;
  }[];
  defaultTab?: string;
};

function Tabs({ tabs, defaultTab }: Props) {
  if (!tabs.length) {
    return <></>;
  }

  return (
    <BaseTabs.Root
      className={styles.tabs}
      defaultValue={defaultTab || tabs[0].key}
    >
      <BaseTabs.List className={styles.list}>
        {tabs.map(tab => (
          <BaseTabs.Tab className={styles.tab} key={tab.key} value={tab.key}>
            {tab.title}
          </BaseTabs.Tab>
        ))}
        <BaseTabs.Indicator className={styles.indicator} />
      </BaseTabs.List>
      {tabs.map(tab => (
        <BaseTabs.Panel className={styles.panel} key={tab.key} value={tab.key}>
          {tab.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}

export default Tabs;
