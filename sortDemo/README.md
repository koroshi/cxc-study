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
	{id:11,sortNumber:1,parentId:10}
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
  { id: 5, sortNumber: 1, parentId: 2 },
  { id: 6, sortNumber: 2, parentId: 2 },
  { id: 2, sortNumber: 2, parentId: null } ]
```

#### 思路

```
此方法还有很多优化的地方，只是比较简单实现效果，没考虑性能优化
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
         {
           "id": 8,
           "sortNumber": 2,
           "parentId": 3
         },
         {
           "id": 9,
           "sortNumber": 3,
           "parentId": 3
         },
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
           }
         ]
       ],
       {
         "id": 4,
         "sortNumber": 2,
         "parentId": 1
       }
     ],
     [
       {
         "id": 5,
         "sortNumber": 1,
         "parentId": 2
       },
       {
         "id": 6,
         "sortNumber": 2,
         "parentId": 2
       }
     ],
     {
       "id": 2,
       "sortNumber": 2,
       "parentId": null
     }
   ]
   ```

4. 然后用lodash的flattenDeep方法把多维数组降维

   ​