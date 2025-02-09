import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { RtlProvider } from '@mantine/ds/src';
import { NativeSelect, NativeSelectProps } from '../NativeSelect';

const stringData = ['React', 'Angular', 'Vue', 'Svelte'];
const data = stringData.map((item) => ({ value: item, label: item }));

function Controlled(props: Partial<NativeSelectProps>) {
  const [value, onChange] = useState(null);
  return (
    <NativeSelect
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      data={data}
      {...props}
    />
  );
}

storiesOf('@mantine/core/NativeSelect/stories', module)
  .add('Controlled', () => (
    <div style={{ maxWidth: 300, padding: 20 }}>
      <Controlled label="Your favorite library" placeholder="Your favorite library" />
    </div>
  ))
  .add('String data', () => (
    <NativeSelect label="Data as string" data={stringData} placeholder="String data" />
  ))
  .add('RTL', () => (
    <RtlProvider>
      <NativeSelect label="Right to left" data={stringData} placeholder="String data" />
    </RtlProvider>
  ));
