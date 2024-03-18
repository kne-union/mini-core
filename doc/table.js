const { Table } = miniCore;
const { Space } = antd;
const { View } = tarojsComponents;

const dataSource = [
  { id: 1, name: "哈哈哈", count: 12 },
  { id: 2, name: "张三", count: 200 },
  { id: 3, name: "李四", count: 100 }
];

const columns = [
  { name: "name", title: "名称" },
  { name: "count", title: "数量" }
];

const BaseExample = () => {
  return (
    <Space direction={"vertical"} size={30}>
      <Space direction={"vertical"}>
        <View>基础用法</View>
        <Table dataSource={dataSource} columns={columns} />
      </Space>
      <Space direction={"vertical"}>
        <View>多列</View>
        <Table
          dataSource={dataSource}
          columns={[{ name: "id", title: "ID" }].concat(columns)}
        />
      </Space>
      <Space direction={"vertical"}>
        <View>自定义rowKey</View>
        <Table rowKey={"name"} dataSource={dataSource} columns={columns} />
      </Space>
      <Space direction={"vertical"}>
        <View>自定义列渲染</View>
        <Table
          dataSource={dataSource}
          columns={[{
            name: "id",
            title: "ID",
            render: (record, {dataSource, column}) => {
              console.log(record, dataSource, column);
              return record.id + '-' +  record.name
            }
          }].concat(columns)}
        />
      </Space>
    </Space>
  );
};

render(<BaseExample />);
