### 子组织跟着父组织排序成一维数组

排序前

```
const toBeSortArray = [
	{id:1,sortNumber:1,parentId:null},
	{id:2,sortNumber:2,parentId:null},
	{id:3,sortNumber:1,parentId:1},
	{id:4,sortNumber:2,parentId:1},
	{id:5,sortNumber:1,parentId:2},
	{id:6,sortNumber:2,parentId:2},
	{id:7,sortNumber:1,parentId:3},
	{id:8,sortNumber:2,parentId:3},
	{id:9,sortNumber:3,parentId:3},
	{id:10,sortNumber:4,parentId:3},
	{id:11,sortNumber:1,parentId:10},
	{id:12,sortNumber:3,parentId:null},
	{id:13,sortNumber:1,parentId:12}
];
```

排序后

```
[ { id: 1, sortNumber: 1, parentId: null },
  { id: 3, sortNumber: 1, parentId: 1 },
  { id: 7, sortNumber: 1, parentId: 3 },
  { id: 8, sortNumber: 2, parentId: 3 },
  { id: 9, sortNumber: 3, parentId: 3 },
  { id: 10, sortNumber: 4, parentId: 3 },
  { id: 11, sortNumber: 1, parentId: 10 },
  { id: 4, sortNumber: 2, parentId: 1 },
  { id: 2, sortNumber: 2, parentId: null },
  { id: 5, sortNumber: 1, parentId: 2 },
  { id: 6, sortNumber: 2, parentId: 2 },
  { id: 12, sortNumber: 3, parentId: null },
  { id: 13, sortNumber: 1, parentId: 12 } ]
```

#### 思路

```
此方法还有很多优化的地方，只是比较简单实现效果，没考虑性能优化

首先lodash有这样一个方法
_.flattenDeep([1, [2, 3, [4]]]);
// => [1, 2, 3, 4]

假设最外层数组为[1,2,3]
那么补充数组为[1,[1],2,[2],3,[3]]
其中[1][2][3]为1,2,3的子元素就可以用递归一次形成这种格式用flattenDeep展开
```

```
注：之前没考虑到每次填补的不是index+1，而应该是index+index+1，
因为每次补充等于翻倍了之前元素然后在往后补充一位放入当前子元素。
因为index的绝对补充也就不能去掉中间空数组了不然没法保证上层所需要加入子元素的位置了。
```

1. 先寻找最外层的sortArray(toBeSortArray,null)

2. 对于每层each后递归调用sortyArray(toBeSortArray,oneArray.id)

3. 生成如下结果：

   ```
   [
     {
       "id": 1,
       "sortNumber": 1,
       "parentId": null
     },
     [
       {
         "id": 3,
         "sortNumber": 1,
         "parentId": 1
       },
       [
         {
           "id": 7,
           "sortNumber": 1,
           "parentId": 3
         },
         [],
         {
           "id": 8,
           "sortNumber": 2,
           "parentId": 3
         },
         [],
         {
           "id": 9,
           "sortNumber": 3,
           "parentId": 3
         },
         [],
         {
           "id": 10,
           "sortNumber": 4,
           "parentId": 3
         },
         [
           {
             "id": 11,
             "sortNumber": 1,
             "parentId": 10
           },
           []
         ]
       ],
       {
         "id": 4,
         "sortNumber": 2,
         "parentId": 1
       },
       []
     ],
     {
       "id": 2,
       "sortNumber": 2,
       "parentId": null
     },
     [
       {
         "id": 5,
         "sortNumber": 1,
         "parentId": 2
       },
       [],
       {
         "id": 6,
         "sortNumber": 2,
         "parentId": 2
       },
       []
     ],
     {
       "id": 12,
       "sortNumber": 3,
       "parentId": null
     },
     [
       {
         "id": 13,
         "sortNumber": 1,
         "parentId": 12
       },
       []
     ]
   ]
   ```

4. 然后用lodash的flattenDeep方法把多维数组降维

   ​