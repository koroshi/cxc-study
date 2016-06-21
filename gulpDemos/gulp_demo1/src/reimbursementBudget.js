function reimbursementBudget(module,args,invokeRecord) {
	var isProject = true;
	var _data;
	// alert($departmentNo);
	var changeMoneyTotal = 0;
	var mainListFields = [
		{name:"subID",showIf:"false"},
		{name:"applicationFormHeadID",showIf:"false"},
		{name:"departmentNo",showIf:"false"},
		{name:"auditorNo",showIf:"false"},
		{name:"applicantNo",showIf:"false"},
		{name:"applicationDate",title:"��������",width:120,dateFormatter:"toJapanShortDatetime"},
		{name:"applicationType",title:"��������",width:120,
			 canFilter:false},
		{name:"applicantName",title:"������Ա",width:100},
		{name:"departmentName",title:"��������",width:150},
		{name:"commissionAgentName",title:"������Ա",width:100,showIf:"false"},
		{name:"commissionAgentNameNew",title:"������Ա",width:100, operator: "iEquals"},
		{name:"subject",title:"����",width:"*"},
		// {name:"auditorName",title:"�����Ա",width:"*"},
		{name:"content",title:"��������",width:"*",showIf:"false"},
		{name:"amountTotal",title:"�����ܽ��",type:"float",width:100, formatCellValue: "isc.Format.toUSString(value,2)",defaultValue:0,summaryFunction:"sum"}
	];
	
	var hoverFields = [
		{name:"headSubID",showIf:"false"},
		{name:"applicationClassification",title:"�������",width:120},
		{name:"applicationContent",title:"��������",width:"*"},
		{name:"applicationAmount",title:"�������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:120,defaultValue:0,summaryFunction:"sum"},
		{name:"moneyRegulation",title:"�������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:120,defaultValue:0,summaryFunction:"sum"},
		{name:"active",showIf:"false"}
	];
	
	var budgetRecord = {};
	
	var mRecord = {};
	
	var innerFormFields = [
		{name:"active",showIf:"false",defaultValue:1},
		{name:"applicationFormHeadID",showIf:"false"},
		{name:"applicationFormHeaddate",showIf:"false",defaultValue:new Date()},
		{name:"operator",showIf:"false",defaultValue:$userName},
		{name:"workStation",showIf:"false",defaultValue:$hostNameLocal},
		{name:"databaseName",showIf:"false",defaultValue:$databaseName},
		{name:"applicationType",title:"��������",width:"*",//required:true,
			canEdit:false,showIf:"false",
			defaultValue:args
		},
		
		{name:"departmentName",title:"��������",width:"*",defaultValue:$departmentName,canEdit:false,showIf:"false"},
		{name:"fullName",title:"��������",width:"*",defaultValue:$fullName,canEdit:false},
		{name:"applicantName",title:"������Ա",width:"*",canEdit:false},
		// {name:"commissionAgentName",title:"������Ա",defaultValue:$name,canEdit:false,width:"*"},//,showIf:"false"
		{name:"commissionAgentNameNew",title:"������Ա",defaultValue:$name,width:"*",canEdit:false},
		{name:"applicationFormNo",title:"��������",width:"*",canEdit:false,showIf:"true"},
		{name:"commissionAgentUsername",title:"������Ա",defaultValue:$userName,width:"*",showIf:"false"},
		{name:"clearingForm",title:"���㷽ʽ",width:"*",type:"select",showIf:"false",
				optionDataSource:"T_baseInfoDS",//required:true,
				valueField:"name",displayField:"name",
				pickListWidth:200,
				pickListFields: [
					{ name:"no",title:"���", width:"*"},//
					{ name:"name",title:"���㷽ʽ", width:"*"}
				],
				getPickListFilterCriteria : function () {
					return {typeNo:"applicationMethod"};
				}},
		{name:"applicationDate",title:"��������",defaultValue:new Date(),canEdit:false,width:"*",type:"datetime",showIf:"false"},//dateFormatter:"toJapanShortDatetime",
		// {name:"commissionAgentName",title:"������Ա",defaultValue:$name,canEdit:false,width:"*"},
		{name:"applicantNo",title:"������Ա",showIf:"false",defaultValue:$userNo},
		{name:"commissionAgentNo",title:"������Ա���",showIf:"false",defaultValue:$userNo},
		{name:"departmentNo",title:"���ű��",showIf:"false",defaultValue:$departmentNo},
		
		//�����ֶθ���ӡ��
		{ name:"moneyRegulationForPrint",title:"�����ܽ��", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100,showIf:"false"},
		{ name:"payMoney",title:"�ѱ������", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100,showIf:"false"},
		
		{name:"auditorNo",showIf:"false"},
		// {name:"Ԥ����Ϣ",title:"Ԥ����Ϣ",type:"header",defaultValue:"<font face=�꿬��  size=2>Ԥ����Ϣ</font>"},
		{name:"relateApplicationNo",title:"<font style='cursor:pointer'><img src='images/Search.gif'></img>Ԥ�㵥��</font>",width:"*",required:true,
			editorType:"select",optionDataSource:"T_applicationFormHeadDS",
			optionOperationId:"sp_cRepeatedPay",
			// optionOperationId:"SFDA_reimburse_getApplicationNo",
			valueField:"applicationFormNo",displayField:"applicationFormNo",
			pickListWidth:950,//fetchDelay :300,
			 //���������������ݣ�˫��ֻ��һ������
			editorProperties:{
				wrapCells:true,
				fixedRecordHeights: false
			},
			 
			pickListFields: [
				/*
				{ name:"applicationFormHeadID",showIf:"false"},
				{ name:"departmentNo",showIf:"false"},
				{ name:"applicantNo",showIf:"false"},
				{ name:"applicationFormNo",title:"Ԥ�㵥��", width:120},
				{ name:"subject",title:"����", width:"*"},
				{ name:"applicationDate",title:"Ԥ������",width:120,dateFormatter:"toJapanShortDatetime"},
				{ name:"departmentName",title:"���벿��", width:100},
				{ name:"applicantName",title:"������Ա", width:70},
				{ name:"amountTotal",title:"�����ܽ��", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100},
				{ name:"moneyRegulationTotal",title:"�����ܽ��", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100}
				*/
				{name:"itemID",showIf:"false"},
				{ name:"applicationFormNo",title:"Ԥ�㵥��", width:120},
				{ name:"applicationDate",title:"Ԥ������",width:80,dateFormatter:"toJapanShortDatetime"},
				{ name:"subject",title:"����",width:200},
				{ name:"operator",showIf:"false"},
				{ name:"subId",showIf:"false"},
				{ name:"applicationType",showIf:"false"},
				{ name:"itemType",showIf:"false"},
				{ name:"amountTotal",title:"�����ܽ��", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100},
				{ name:"moneyRegulation",title:"�����ܽ��", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100},
				{ name:"portionAmount",title:"portionAmount", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100,showIf:"false"},
				{ name:"creditAmount",showIf:"false"},
				{ name:"commissionAgentName",showIf:"false"},
				{ name:"commissionAgentNo",showIf:"false"},
				{ name:"applicantName",title:"������Ա"},
				// { name:"auditMoney",title:"����н��", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100},
				{ name:"payMoney",title:"�ѱ������", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100},
				{ name:"surplusMoney",title:"ʣ����", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100},
				// { name:"balanceOfLoan",title:"�ѽ����", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100},
				// { name:"LoanSurplus",title:"���ʣ��", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100},
				{ name:"relateApplicationNo",showIf:"false"},
				{ name:"isSeparate",title:"��α���",width:80,type:"boolean",showIf:"false"}
					
			],
			getPickListFilterCriteria: function(){
				this.pickList.invalidateCache();
				return {GZNY:$GZNY,userName:$userName,applicationType:args};
				// return {userName:$userName,useAppType:args};
			},changed :function(form, item, value){
				var it = this,record = this.getSelectedRecord();
				// alertAll(record);
				// form.setValue("relateApSubject",record.subject);
				form.setValue("relateApDate",record.applicationDate);
				form.setValue("applicantName",record.applicantName);
				form.setValue("subject",record.subject);
				form.setValue("surplus",record.surplusMoney);
				// �����ֶθ���ӡ��
				form.setValue("payMoney",record.payMoney);
				form.setValue("moneyRegulationForPrint",record.moneyRegulation); 
				form.setValue("relateApAmountT",record.moneyRegulation);  
				//ץ��ϸ
				record.relateApplicationNo = record.applicationFormNo 
				record.itemType = 'Ԥ��';
				record.auditorType = 'Ԥ��';
				var budgetDetail = getBudgetDetail(record);
				layout.innerDetailLayout.getMember(1).setTabPane('budgetDetail',budgetDetail)	
				
			
			if(!form.getValue("applicationFormHeadID")){
				mRecord.itemID = "-1";
				mRecord.itemType=args;
				mRecord.applicationType = "";
				mRecord.subID = -1;
				mRecord.relateApplicationNo = record.applicationFormNo;
			}else	mRecord = layout.mainList.getSelectedRecord();
		 
			 isc.DataSource.get("T_applicationFormHeadDS").fetchData({active:1,applicationFormNo:value},function(dsResponse,data){
					// alertAll(data);
					mRecord.relateApplicationNo = record.relateApplicationNo;
					mRecord.relateApplicationType = record.applicationType
				    mRecord.relateSubID = record.subID;
					mRecord.applicationNo = layout.innerForm.getValue("relateApplicationNo");
					mRecord.loanNo = layout.innerForm.getValue("loanNo");
					mRecord.relateItemType=data[0].itemType;
					// mRecord.itemType = args;
					mRecord.applicationType = args;
					// alertAll(mRecord);
					getNewLayout(mRecord);
					isc.DataSource.get("T_applicationFormHeadDS").fetchData({headSubID:record.subID,databaseName:$databaseName},function(dsResponse,data){
						_data = data;
						innerListDetail.setData(data);
					// alertAll(data[0]);
					},{operationId:"SFDA_common_getDetails"}); 
				});

		    
				
				/*
				var _values = {};
				_values.projectYear = $GZNY;
				_values.departmentNo = layout.innerForm.getValue("departmentNo");
				_values.databaseName = $databaseName;
				_values.projcetName = null;
				_values.applicationClassification = null;
				_values.applicationFormNo = record.applicationFormNo;
				isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
					if(data.length==1){
						if(!data[0].projectEstablishmentID){}
						else{
							innerListDetail.setData([{remarks:"",subID:"",projectName:data[0].projectName,applicationClassification:data[0].applicationClassification}]);
							//projectEstablishmentID:data[0].projectEstablishmentID,
						}
					}else if(data.length>1){
						innerListDetail.setData([{remarks:"",subID:"",projectName:data[0].projectName,applicationClassification:data[0].applicationClassification}]);
					    //projectEstablishmentID:data[0].projectEstablishmentID,
					}else if(data.length==0){
						innerListDetail.setData([{applicationContent:"",remarks:"",subID:"",projectName:"",applicationClassification:""}]);
					}
					hideItemField();
				} ,{operationId:"SFDA_ZQ_XMXZ"});
				*/
				 
			},
			titleClick :function(form, item){
				if(!layout.innerForm.getValue("relateApplicationNo")){
					isc.say("��ѡ��Ԥ�㵥��!");return;
				}
				
				var applicationListFields = [
					{name:"operator",showIf:"false"},
					{name:"auditStatusE",title:" ",type:"image",width: 25,
								imageURLPrefix:"Victor/", imageURLSuffix:".png", imageSize: 23},
					{name:"applicationDate",title:"��������",type:"date",align:"center",dateFormatter :"toJapanShortDate",width:80},
					{name:"auditDate",title:"�������",dateFormatter :"toJapanShortDate",width:100,showIf:"false"},
					{name:"applicantNo",title:"�����˱��",width:60,showIf:"false"},
					{name:"applicantName",title:"������",width:60},
					{name:"commissionAgentNo",title:"�����˱��",width:60,showIf:"false"},
					{name:"commissionAgentName",title:"������",width:60,showIf:"false"},
					{name:"departmentNo",title:"���ű��",width:60,showIf:"false"},
					{name:"departmentName",title:"��������",width:60,showIf:"false"},
					{name:"applicationType",title:"��������",width:100},
					{name:"itemType",title:"��������",width:100,showIf:"false"},
					{name:"subID",showIf:"false"},
					{name:"subject",title:"����",showHover:true,
						hoverHTML:function (record, value, rowNum, colNum, grid) {
							if (record.subject){
								return record.subject;
							}
						},width:"80%"},
					{name:"applicationFormNo",showIf:"false"},
					{name:"amountTotal",title:"������",type:"float",align:"right", formatCellValue: "isc.Format.toUSString(value, 2)",summaryFunction:"sum",width:110},
					{name:"moneyRegulation",title:"�������",type:"float",align:"right", formatCellValue: "isc.Format.toUSString(value, 2)",summaryFunction:"sum",width:110},
					{name:"loanNo",title:"����",showIf:"false"},
					{name:"loanTotalAmount",title:"����ܶ�",type:"float",align:"right", formatCellValue: "isc.Format.toUSString(value, 2)",summaryFunction:"sum",width:120,showIf:"false"},
					{name:"reimbursementAmount",title:"�������",type:"float",align:"right", formatCellValue: "isc.Format.toUSString(value, 2)",summaryFunction:"sum",width:120,showIf:"false"},
					{name:"returnedAmount",title:"�˻ؽ��",type:"float",align:"right", formatCellValue: "isc.Format.toUSString(value, 2)",summaryFunction:"sum",width:120,showIf:"false"},
					{name:"portionAmount",title:"���˽��",type:"float",align:"right", formatCellValue: "isc.Format.toUSString(value, 2)",summaryFunction:"sum",width:110},
					{name:"creditAmount",title:"֧�����",type:"float",align:"right", formatCellValue: "isc.Format.toUSString(value, 2)",summaryFunction:"sum",width:120,showIf:"false"},
					{name:"pay",title:"֧��",canEdit:false,width:30,showHover: false},
					{name:"auditStatus",title:"���״̬",width:60},
					{name:"runDate",title:"����",align:"right",
						formatCellValue:function (value) {
							if(value){
								return value+"��";
							}else{
								return "0��";
							}
							
						},width:30,showIf:"false"},
					// {name:"print",title:"��ӡ",width:60,showIf:"true",canEdit:false}
					{name:"printStatusE",title:"��ӡ",type:"image",width: 25,showIf:"false",
								imageURLPrefix:"Victor/", imageURLSuffix:"DY.png", imageSize: 23,canHover: false,showHover: false}
					
				];
				
				var detailHoverFields = [
					{name:"headSubID",showIf:"false"},
					{name:"applicationClassification",title:"�������",width:80},
					{name:"applicationContent",title:"��������"},
					{name:"projectName",title:"��Ŀ����"},
					{name:"applicationAmount",title:"������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100,defaultValue:0,summaryFunction:"sum"},
					{name:"moneyRegulation",title:"�������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100,defaultValue:0,summaryFunction:"sum"},
					{name:"active",showIf:"false"}
				];
				
				var abroadHoverFields = [
					{name:"headSubID",showIf:"false"},
					{name:"applicationClassification",title:"�������",width:80,showIf:"false"},
					{name:"flags",title:" ",type:"image",imageURLPrefix:"flags/24/", imageURLSuffix:".png",imageSize:23,width:30},
					{name:"country",title:"�������",width:80},
					{name:"sevday",title:"����",align:"right",width:40},
					{name:"nnt",title:"����",align:"right",width:40},
					{name:"currencies",title:"�ұ�",width:55,type:"image",imageURLPrefix:"Victor/", imageURLSuffix:".png", imageWidth:45},
					{name:"applicationAmount",title:"������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",summaryFunction:"sum",width:"*"},
					{name:"currency",title:"�ұ�",width:55,type:"image",imageURLPrefix:"Victor/", imageURLSuffix:".png",imageWidth:45},
					{name:"pocketmoney",title:"���÷�",type:"float",formatCellValue: "isc.Format.toUSString(value,2)",width:"*"},
					// {name:"projectName",title:"��Ŀ����"},
					// {name:"applicationAmount",title:"������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100,defaultValue:0,summaryFunction:"sum"},
					// {name:"moneyRegulation",title:"�������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100,defaultValue:0,summaryFunction:"sum"},
					{name:"active",showIf:"false"}
				];
				
				var historyFields = [
					{name:"auditInfoID",showIf:"false"},
					{name:"auditInfodate",title:"�������",type:"datetime",dateFormatter:"toJapanShortDatetime",width:"100"},
					{name:"operator",showIf:"false"},
					{name:"workStation",showIf:"false"},
					{name:"itemType",title:"��������",width:80},
					{name:"itemID",showIf:"false"},
					{name:"auditorType",title:"�������",width:80},
					{name:"auditorClass",showIf:"false"},
					{name:"auditorOrder",showIf:"false"},
					{name:"auditorDepartName",title:"��������",width:80},
					{name:"auditorDuty",title:"ְ��",width:80},
					{name:"auditorDepartNo",showIf:"false"},		
					{name:"auditorName",title:"�����",width:60},
					{name:"auditorUserNo",showIf:"false"},
					{name:"auditorUserName",showIf:"false"},
					{name:"auditOpinion",title:"���״̬",width:80},
					{name:"auditRemarks",title:"������"},
					{name:"moneyRegulation",title:"�������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100,defaultValue:0,summaryFunction:"sum"}
				];
				
				var applicationList = isc.ListGrid.create({
					autoDraw:false,
					canSort:false,
					//�����Զ����к��и��Զ�����
					wrapCells:true,
					fixedRecordHeights: false,				
					dataSource:"T_desktopAppliactionStatusDS",	
					// autoFetchData:false,
					showGridSummary :true,
					fields:applicationListFields,
					// showFilterEditor: true,
					showRecordComponents: true,
					showRecordComponentsByCell: true,
					// showFilterEditor: true,
					// filterOnKeypress: true,
					sortField:"applicationDate",
					sortDirection: "descending",
					initWidget : function () {
						this.Super("initWidget", arguments); 
						var that = this;
						var values = {};
						values.gzny = $GZNY;
						values.userName = $userName;
						values.relateApplicationNo = layout.innerForm.getValue("relateApplicationNo");
						isc.DataSource.get("T_applicationFormHeadDS").fetchData(values,function(dsResponse,data){
							// that.setData(data);
							that.fetchData({operator:$userName});
							itemWin.saveBtn.setDisabled(false);
						},{operationId:"SP_CmutipleApplicationStatus"});
					},
					// refreshStatus:function(){
						// isc.DataSource.get("T_desktopAppliactionStatusDS").fetchData({gzny:$GZNY,userName:$userName},
							// function(dsResponse,data){
								// applicationList.invalidateCache();
								// applicationList.fetchData({workYear:$GZNY.substring(0,4),operator:$userName});
							// },{operationId:"SP_CdesktopApplicationStatus_new"}
						// )
					// },
					createRecordComponent : function (record, colNum) {  
						var fieldName = this.getFieldName(colNum);  
						var that = this;
						if ((fieldName == "pay")) {
							var recordCanvas = isc.HLayout.create({
								height: 22,	align: "left"
							});
							var paidImg = isc.ImgButton.create({
								showDown: false,showRollOver: false,
								layoutAlign: "center",
								src: "Victor/paid.png",
								prompt: "֧�����: "+record.creditAmount,
								height: 22,	width: 22,grid:this
							});
							recordCanvas.addMember(paidImg);
							
							if((record.payStatus =="paying")){
								return null;
							}else{
								return recordCanvas;
							}
							
						}
					},
					getCellCSSText: function (record, rowNum, colNum) {
						var record = this.getRecord(rowNum);
						fieldName = this.getFieldName(colNum);
						
						if((record.amountTotal != record.moneyRegulation)||(record.amountTotal != record.portionAmount)){
							if((record.amountTotal != record.moneyRegulation)&&(record.amountTotal == record.portionAmount)){
								if (fieldName == "moneyRegulation") {
										return "font-weight:bold; color:blue;";
								}
							}else if((record.amountTotal == record.moneyRegulation)&&(record.amountTotal != record.portionAmount)){
								if (fieldName == "portionAmount") {
										return "font-weight:bold; color:blue;";
								}
							}else if((record.amountTotal != record.moneyRegulation)&&(record.amountTotal != record.portionAmount)){
								if ((fieldName == "moneyRegulation")||(fieldName == "portionAmount")) {
										return "font-weight:bold; color:blue;";
								}
							}else return null;
						}
						
						if(record.auditStatus == "ͬ��"){
							return "font-weight:bold; color:green;";
						}else if(record.auditStatus == "��ͬ��"){
							return "font-weight:bold; color:red;";
						}else if(record.auditStatus == "�˻��޸�"){
							return "font-weight:bold; color:red;";
						}	
						else return null;
					},
					canHover: true,
					showHover: true,
					// hoverWidth:"60%",
					showHoverComponents: true,
					getCellHoverComponent : function (record, rowNum, colNum) {
						var record = this.getRecord(rowNum);
						fieldName = this.getFieldName(colNum);
						if ((fieldName == "auditStatusE")||(fieldName == "auditStatus")){
							var flow = isc.M3FlowShow.create({
								width:"100%",height:"100%",
								hideButton:true,
								getCriteria:function(){
									var values = {};
									values.itemID = -1;
									values.itemType = "";
									values.applicationType = "";
									try{
										if(record.subID){
											values.itemID = record.subID;
											values.itemType = record.itemType;
											values.applicationType = record.applicationType;
										}
									}catch(e){}
									return values;
								},
								setAction:function(){
								}
							});

							var historyList = isc.M3ListGrid.create({
								width:"100%",height:100,
								fields:historyFields,
								autoFitData:"both",
								wrapCells:true,
								fixedRecordHeights: false,	
								initWidget : function () {
									this.Super("initWidget", arguments);
									var hList = this;
									isc.DataSource.get("T_applicationFormHeadDS").fetchData({itemID:record.applicationFormHeadID,relateNo:record.applicationFormNo},function(dsResponse,data){
										hList.setData(data);
									},{operationId:"SFDA_auditFlow_auditHistory", showPrompt:false} );
								}
							});		
				
							var flowlayout = isc.VLayout.create({
								width:"100%",height:"100%",
								members:[flow,historyList]
							});
				
							var flowWin = isc.Window.create({
								showTitle:false,showHeader:false,
								autoSize:true,
								autoCenter: true,edgeSize:2,edgeTop:2,edgeBottom:2,
								isModal: true,showModalMask: true
							});
							
							flowWin.addItems([flowlayout]);
							
							this.rowHoverComponent = isc.VLayout.create({
								width:"70%",height:"100%",
								members:[flowWin]
							});
							return this.rowHoverComponent;
						}else if(record.applicationType=='�����û�����'){
							var abroadList = isc.M3ListGrid.create({
								width:"100%",height:100,
								dataSource: "T_applicationFormDtDS",
								showGridSummary :true,
								autoFitData:"both",
								wrapCells:true,
								fixedRecordHeights: false,
								fields:abroadHoverFields,
								headerHeight:35,
								initWidget : function () {
									this.Super("initWidget", arguments);
									var aList = this;
									if(record.subID){
										aList.fetchData({databaseName:$databaseName,headSubID: record.subID,active:1}, function(dsResponse,data){
											aList.setData(data);
										}, { showPrompt: false} );
									}
								},
								headerSpans : [
									{fields: ["currencies","applicationAmount"],title: "�����׼"},
									{fields: ["currency","pocketmoney"],title: "���ñ�׼"}
								],
								getCellCSSText: function (record, rowNum, colNum) {
									for(var i=0;i<abroadList.data.length;i++){
										if(abroadList.data[i].applicationAmount != abroadList.data[i].moneyRegulation){
											if (abroadList.getFieldName(colNum) == "moneyRegulation") {
												return "font-weight:bold; color:blue;";
											}
										}else return null;
									}
								}
							});
							var abroadLayout = isc.VLayout.create({
								width:"100%",height:"100%",
								members:[abroadList]
							});
							this.rowHoverComponent = isc.VLayout.create({
								width:"60%",height:"100%",
								members:[abroadLayout]
							});
							
							return this.rowHoverComponent;
						}else{
							var detailList = isc.M3ListGrid.create({
								width:"100%",height:100,
								dataSource: "T_applicationFormDtDS",
								showGridSummary :true,
								autoFitData:"both",
								wrapCells:true,
								fixedRecordHeights: false,	
								fields:detailHoverFields,
								initWidget : function () {
									this.Super("initWidget", arguments);
									var dList = this;
									if(record.subID){
										dList.fetchData({databaseName:$databaseName,headSubID: record.subID,active:1}, function(dsResponse,data){
											dList.setData(data);
										}, { showPrompt: false} );
									}
								},
								getCellCSSText: function (record, rowNum, colNum) {
									for(var i=0;i<detailList.data.length;i++){
										if(detailList.data[i].applicationAmount != detailList.data[i].moneyRegulation){
											if (detailList.getFieldName(colNum) == "moneyRegulation") {
												return "font-weight:bold; color:blue;";
											}
										}else return null;
									}
								}
							});
							var detailLayout = isc.VLayout.create({
								width:"100%",height:"100%",
								members:[detailList]
							});
							this.rowHoverComponent = isc.VLayout.create({
								width:"60%",height:"100%",
								members:[detailLayout]
							});
							return this.rowHoverComponent;
						}
					},
					recordDoubleClick:function(viewer, record, recordNum, field, fieldNum, value, rawValue) {
						
					}
				});	
				
				var itemWin = isc.M3Windows.create({
					title:"������¼:",VLWidth:900,VLHeight:370,
					innerLayoutHeight:340,
					hideSaveButton:true,
					saveAction:function(){
						
					},
					backAction:function(){
						
					}
				});
				
				itemWin.innerLayout.setMembers([applicationList]);
				itemWin.window.show();
			}
		},
		{name:"relateApDate",title:"Ԥ������",width:"*",canEdit:false,dateFormatter:"toJapanShortDatetime"},
		{name:"relateApAmountT",title:"Ԥ���ܶ�",width:"*",canEdit:false, 
			type:"float",align:"right", //endRow:true,
			formatValue:function(value, record, form, item){
				return isc.Format.toUSString(value,2);
		}},
		// {name:"surplus",title:"<font style='cursor:pointer'><img src='images/Search.gif'></img>ʣ����</font>",width:"*",canEdit:false, 
		{name:"surplus",title:"ʣ����",width:"*",canEdit:false, 
			type:"float",align:"right", //endRow:true,
			// disabled :true,
			formatValue:function(value, record, form, item){
				return isc.Format.toUSString(value,2);
			},
			titleClick :function(form, item){
				// alertAll(item);
			},
			click :function(form, item){
				// alertAll(item);
			}
		},
		
		{name:"subject",title:"��������",width:"*",colSpan:3,canEdit:true,required:true,type:"text"},
		{name:"attachmentQuantities",title:"��������",width:"*",canEdit:true,required:true,type:"text",keyPressFilter: "[0-9]"},
		{name:"relateApName",title:"������Ա",width:"*",canEdit:false,showIf:"false"},
		{name:"isSeparate",title:"<b><font color=red>��α���</font>", type:"checkbox",showIf:"true"},
		{name:"isWriteOff",title:"<b><font color=red>�Ƿ����</font>",type:"checkbox",showIf:"true"},
		{name:"relateApSubject",title:"Ԥ������",width:"*",colSpan:3,canEdit:false,endRow:true,showIf:"false"},
		{name:"payMent",title:"�ǹ���֧��˵��",width:"*",colSpan:5,canEdit:true,type:"text"},
		{name:"payAccountNumber",title:"�Է��˺�",width:"*",colSpan:3,canEdit:true, editorType:"TextItemAddIcon",
			editorProperties:{
				keyPress: function(item, form, keyName){
					if (keyName == 'Enter'){
						//form.setValue("payAccountNumber","");
						var _payAccountNumber ='';
						var flag = '';
						
						var listPay = isc.M3ListGrid.create({
							width: "100%",
							height: "100%",
							showFilterEditor:true,
							recordDoubleClick: function (viewer, record, recordNum, field, fieldNum, value, rawValue){		
								
								_payAccountNumber = this.getSelectedRecord().payAccountNumber;
								SearchForm.setValue("payAccountNumber",_payAccountNumber);
								deleteButton.setDisabled(false);
								windowInput.show();

							},
							fields: [
								{name:"payAccountNumberID",showIf: "false"},
								{name:"payAccountNumber",title:"�Է��˺�",width:"*"},
								{name:"isXZ", type:"boolean",title:" ",defaultValue:0,canEdit:true,canFilter:false}
							],
							filterEditorSubmit:function(criteria){
								var values = {};
								values.active = 1;
								values.operator = $userName;
								isc.DataSource.get("T_payAccountNumberDS").fetchData(values,function(dsResponse,data){
									isc.DataSource.create({
										ID:"T_payAccountNumberDS",
										fields:[
											{name:"payAccountNumberID",showIf: "false"},
											{name:"payAccountNumber",title:"�Է��˺�",width:"*"},
											{name:"isXZ", type:"boolean",title:" ",defaultValue:0,canEdit:true}
										]
									});
									listPay.setData(T_payAccountNumberDS.applyFilter(data,criteria,{textMatchStyle:"substring"}));
								});
							}
						});
							
						var newButton = isc.M3ImgButton.create({
							type:"new", 
							template:this,
							title:"����",
							action:function(){
								windowInput.show();
								deleteButton.setDisabled(true);
							}
						});
						
						var okButton = isc.M3ImgButton.create({
							type:"ok", 
							template:this,
							title:"ȷ��",
							action:function(){
								var listxml = toXmlForDataFilter(listPay.data,listPay.getAllFields());
								
								isc.DataSource.get("T_payAccountNumberDS").fetchData({xml:listxml},function(dsResponse,data){
									if(data[0].name == ''){
										isc.say("��ѡ��Է��˺�");
									}else{
										form.setValue("payAccountNumber",data[0].name);
										windowPay.hide();
									}
									
								},{operationId:"SCW_payAccountNumberFX"})
							}
						});
						
						var bottonLayout = isc.HLayout.create({
							autoDraw:false,
							width:"15%",
							height:30,
							members:[newButton,okButton]//,deleteButton
						});
						
						var windowPay = isc.Window.create({
							title: "�Է��˺�ѡ��",
							autoSize:true,
							autoCenter: true,
							isModal: true,
							showModalMask: true,
							autoDraw: false,
							isExistsRecord:true,
							showMinimizeButton: false,
							items:[
								isc.VLayout.create({
									width: 450, 
									height: 300,
									members:[listPay,bottonLayout]
								})
							]
						});
						
						var SearchForm = isc.DynamicForm.create({
							autoDraw: false,
							height: 30,
							padding:1,
							fields: [
								{name:"payAccountNumber",title:"�Է��˺�",type:"text"}
							]
						});
						
						var inputButton = isc.M3ImgButton.create({
							type:"ok", 
							template:this,
							title:"ȷ��",
							action:function(){
								var values = {};
								values.operator = $userName;
								values.workStation = $hostNameLocal;
								values.databaseName = $databaseName;
								values.payAccountNumber = SearchForm.getValue('payAccountNumber');
								values.pd = _payAccountNumber;

								isc.DataSource.get("T_payAccountNumberDS").fetchData(values,function(dsResponse,data){
									isc.DataSource.get("T_payAccountNumberDS").fetchData({active:1,operator:$userName},function (dsResponse, data){
										listPay.setData(data);
										SearchForm.clearValues();
										_payAccountNumber = '';
										windowInput.hide();
										
									});
								},{operationId:"SCW_payAccountNumber_save"})
								
							}
						});
						
						var deleteButton = isc.M3ImgButton.create({
							type:"delete", 
							template:this,
							title:"ɾ��",
							action:function() {
								var values = {};
								values.operator = $userName;
								values.payAccountNumber = SearchForm.getValue('payAccountNumber');
								isc.confirm("�Ƿ�ɾ�����˺�", function (value) {
									if (value) {
										isc.DataSource.get("T_payAccountNumberDS").fetchData(values,function(dsResponse,data){
											isc.DataSource.get("T_payAccountNumberDS").fetchData({active:1,operator:$userName},function (dsResponse, data){
												listPay.setData(data);
												SearchForm.clearValues();
												_payAccountNumber = '';
												windowInput.hide();
												
											});
										},{operationId:"SCW_payAccountNumber_delete"})
									}
								});
							}
						});
						
						var bottonLayout1 = isc.HLayout.create({
							autoDraw:false,
							width:"15%",
							height:30,
							members:[inputButton,deleteButton]//,deleteButton
						});
						
						var windowInput = isc.Window.create({
							title: "�Է��˺���Ϣ",
							autoSize:true,
							autoCenter: true,
							isModal: true,
							showModalMask: true,
							autoDraw: false,
							showMinimizeButton: false,
							items:[
								isc.VLayout.create({
									width: 250, 
									height: 60,
									members:[SearchForm,bottonLayout1]
								})
							]
						});
						
						if (typeof(form.getValue("payAccountNumber")) == 'undefined'){
							isc.DataSource.get("T_payAccountNumberDS").fetchData({active:1,operator:$userName},function (dsResponse, data){
								if (data.length > 0){
									listPay.setData(data);
									listPay.selectRecord(0);
									windowPay.show();
									listPay.focus();
								}else{
									windowPay.show();
								}
							});
							
						}else{
							isc.DataSource.get("T_payAccountNumberDS").fetchData({operator:$userName,payAccountNumber:form.getValue("payAccountNumber")},function(dsResponse,data){
								
								listPay.setData(data);
								windowPay.show();
							},{operationId:"SCW_payAccountNumberXZ"})
							
						}
						
						

					}
				}
					
			}
		
		},
	
		
		
		// {name:"�տ���Ϣ",title:"�տ���Ϣ",type:"header",defaultValue:"<font face=�꿬��  size=2>�տ���Ϣ</font>"},
		// {name:"payee",title:"�տλ",width:"*"},
		// {name:"depositBank",title:"��������",width:"*"},
		// {name:"bankAccountNumber",title:"�����ʺ�",width:"*"},
		// {name:"������Ϣ",title:"������Ϣ",type:"header",defaultValue:"<font face=�꿬��  size=2>������Ϣ</font>"},
		{name:"reimbursementAmount",title:"���α���",width:"*",keyPressFilter: "[0-9.]",canEdit:false,showIf:"false",//required:true,
			type:"float",align:"right",//validateOnExit :true,
			// formatOnFocusChange :true,
			formatValue :function(value, record, form, item){
				return isc.Format.toUSString(value,2);
			},
			changed :function(form, item, value){

			}
		},
		
		
		{name:"loanNo",title:"����",width:"*",//required:true,
			editorType:"select",optionDataSource:"T_applicationFormHeadDS",
			optionOperationId:"SFDA_ZQ_JKDXZ",
			valueField:"applicationFormNo",displayField:"applicationFormNo",
			pickListWidth:600,//fetchDelay :300,
			pickListFields: [
				{ name:"applicationFormHeadID",showIf:"false"},
				{ name:"applicationFormNo",title:"����", width:120},//
				{ name:"applicationContent",title:"�������", width:"*"},
				{ name:"applicationAmount",title:"�����", type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:100}
			],
			getPickListFilterCriteria: function(){
				this.pickList.invalidateCache();
				return {userName:$userName,applicationType:'������뵥'};
			},changed :function(form, item, value){
				var it = this,record = this.getSelectedRecord();
				var subID = layout.innerForm.getValue("subID");
				var selectedRecord = this.getSelectedRecord();
				var applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
				if(!applicationFormNo){
					isc.say("����ѡ��Ԥ��!");form.clearValue("loanNo");return;
				}
				
				form.setValue("loanNo",value);
				
				mRecord.loanNo = value;
				mRecord.showDetail = false;
				getNewLayout(mRecord);

				// if(applicationFormNo){
					// form.setValue("applicationFormNo",applicationFormNo);
				// }
				try{
					form.setValue("loanTotalAmount",selectedRecord.applicationAmount);
					
					var loanTotalAmount = form.getValue("loanTotalAmount");
					var returnedAmount=0,additionalAmount=0;
					var balance = parseFloat(loanTotalAmount) - parseFloat(form.getValue("reimbursementAmount")[0]);
					//form.setValue("reimbursementAmount",parseFloat(innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0]));
					if(balance>0){
						form.setValue("returnedAmount",balance);
						form.setValue("additionalAmount",0);
					}else{
						form.setValue("returnedAmount",0);
						form.setValue("additionalAmount",Math.abs(balance));
					}
				}catch(e){}
			},showIf:"true"
		},
		{name:"loanTotalAmount",title:"����ܶ�",width:"*",canEdit:false,showIf:"true", 
			type:"float",align:"right", //endRow:true,
			formatValue:function(value, record, form, item){
				return isc.Format.toUSString(value,2);
		}},
		{name:"returnedAmount",title:"�˻ؽ��",width:"*",canEdit:false,showIf:"true", 
			type:"float",align:"right",
			formatValue:function(value, record, form, item){
				return isc.Format.toUSString(value,2);
			}},
		{name:"additionalAmount",title:"�������",width:"*",canEdit:false,showIf:"true",
			type:"float",align:"right",
			formatValue:function(value, record, form, item){
				return isc.Format.toUSString(value,2);
			}},
		{name:"subID",showIf:"false"},
		{name:"remarks",showIf:"false"},
		{name:"documentStatus",showIf:"false",defaultValue:"�ݸ�"},//
		{name:"auditStatus",showIf:"false"}	
	];
	
	//=======�������ֶ�
	var initialSort = [
		{property: "applicationDate", direction: "descending"}
	];
	var correspondingStandard = "";
	var ImplementWayStandard = "";
	var innerListDetail = isc.M3ListGrid.create({
		width:"100%",height:"300%",//cellHeight:40,
		// dataSource:"T_applicationFormDtDS",
		showGridSummary :true,canSort:false,
		showRecordComponents: true,  		
		showRecordComponentsByCell: true,  
		canEdit:true,editByCell :true,
		modalEditing :true,
		editEvent :"click",
		// canRemoveRecords :true,//
		enterKeyEditAction :null,
		fields:[
			{name:"subID",showIf:"false"},
			{name:"applicationClassification",title:"�������",width:120,editorType:"TextItemAddIcon",
			// editorProperties:{
				// align:"right",
				// icons:[{src: "selectPicker.png", height: 22}],
				// iconClick:function(form,item,keyName){
				editorProperties:{
					keyPress: function(item, form, keyName){
						if (keyName == 'Enter'){
							var grid = item.grid;					
							var recordInMainList = {};						
							if (grid.getEditedRecord(grid.getEditRow()) != null){
								recordInMainList = grid.getEditedRecord(grid.getEditRow());
							}							
							var listProject = isc.M3ListGrid.create({
								width: "100%",
								height: "100%",
								recordDoubleClick: function (viewer, record, recordNum, field, fieldNum, value, rawValue){
									correspondingStandard = record.correspondingStandard;
									grid.setEditValue(item.rowNum, grid.getFieldNum("applicationClassification"), record.name);
									grid.setEditValue(item.rowNum, grid.getFieldNum("correspondingStandard"), record.correspondingStandard);						
									grid.setEditValue(item.rowNum, grid.getFieldNum("budgetApplicationContentID"), record.budgetApplicationContentID);
									grid.data[item.rowNum].applicationClassification = record.name;									
									grid.data[item.rowNum].correspondingStandard = record.correspondingStandard;									
									viewer.topElement.hide();									
									grid.endEditing();
									if(layout.innerForm.getValue("relateApplicationNo")){
										// grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
										grid.startEditing(item.rowNum, grid.getFieldNum('clearingForm'));
									}else{
										if(grid.getFieldNum('projectName')<0){
											// grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
											grid.startEditing(item.rowNum, grid.getFieldNum('clearingForm'));
										}else if(grid.getField(grid.getFieldNum('projectName')).isProject){
											grid.startEditing(item.rowNum, grid.getFieldNum('projectName'));
										}
										else if(!grid.getField(grid.getFieldNum('projectName')).isProject){
											grid.startEditing(item.rowNum, grid.getFieldNum('projectName'));
										}
										// grid.startEditing(item.rowNum, grid.getFieldNum('projectName'));
									}
								},
								
								fields: [
									{ name:"no",title:"�������",width:60},
									{ name:"name",title:"��������", width:150},
									{ name:"budgetApplicationContentID",title:"��Ŀ����",showIf:"false"},
									{ name:"correspondingStandard",title:"��Ӧ�淶",width:"*"}
								]
							});
							
							var windowProject = isc.Window.create({
								title: "ѡ����Ŀ",
								autoSize:true,
								autoCenter: true,
								isModal: true,
								showModalMask: true,
								autoDraw: false,
								showMinimizeButton: false,
								items:[
								isc.VLayout.create({
									width: 800, 
									height: 370,
									members:[listProject]
								})
								]
							});
							isc.DataSource.get("T_applicationFormHeadDS").fetchData({
								category:args,
								SRNR:recordInMainList.applicationClassification
							},
							function (dsResponse, data){
								if (data.length > 0){
									listProject.setData(data);
									listProject.selectRecord(0);
									windowProject.show();
									listProject.focus();
								}
							},{operationId: "SFDA_ZQ_paymentApplicationContent"});
						}
					}
				},
		
				/* editorProperties:{
					keyPress: function(item, form, keyName){
						if (keyName == 'Enter'){
							var grid = item.grid;					
							var recordInMainList = {};						
							if (grid.getEditedRecord(grid.getEditRow()) != null){
								recordInMainList = grid.getEditedRecord(grid.getEditRow());
							}							
							var listProject = isc.M3ListGrid.create({
								width: "100%",
								height: "100%",
								recordDoubleClick: function (viewer, record, recordNum, field, fieldNum, value, rawValue){
									correspondingStandard = record.correspondingStandard;
									grid.setEditValue(item.rowNum, grid.getFieldNum("applicationClassification"), record.name);
									grid.setEditValue(item.rowNum, grid.getFieldNum("correspondingStandard"), record.correspondingStandard);						
									grid.setEditValue(item.rowNum, grid.getFieldNum("budgetApplicationContentID"), record.budgetApplicationContentID);
									grid.data[item.rowNum].applicationClassification = record.name;									
									grid.data[item.rowNum].correspondingStandard = record.correspondingStandard;									
									viewer.topElement.hide();									
									grid.endEditing();
									if(layout.innerForm.getValue("relateApplicationNo")){
										// grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
										grid.startEditing(item.rowNum, grid.getFieldNum('clearingForm'));
									}else{
										if(grid.getFieldNum('projectName')<0){
											// grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
											grid.startEditing(item.rowNum, grid.getFieldNum('clearingForm'));
										}else if(grid.getField(grid.getFieldNum('projectName')).isProject){
											grid.startEditing(item.rowNum, grid.getFieldNum('projectName'));
										}
										else if(!grid.getField(grid.getFieldNum('projectName')).isProject){
											grid.startEditing(item.rowNum, grid.getFieldNum('projectName'));
										}
										// grid.startEditing(item.rowNum, grid.getFieldNum('projectName'));
									}
								},
								
								fields: [
									{ name:"no",title:"�������",width:60},
									{ name:"name",title:"��������", width:150},
									{ name:"budgetApplicationContentID",title:"��Ŀ����",showIf:"false"},
									{ name:"correspondingStandard",title:"��Ӧ�淶",width:"*"}
								]
							});
							
							var windowProject = isc.Window.create({
							    title: "ѡ����Ŀ",
							    autoSize:true,
							    autoCenter: true,
							    isModal: true,
							    showModalMask: true,
							    autoDraw: false,
							    showMinimizeButton: false,
							    items:[
								isc.VLayout.create({
									width: 800, 
									height: 370,
									members:[listProject]
								})
							    ]
							});
							isc.DataSource.get("T_applicationFormHeadDS").fetchData({
								category:args,
								SRNR:recordInMainList.applicationClassification
							},
							function (dsResponse, data){
								if (data.length > 0){
									listProject.setData(data);
									listProject.selectRecord(0);
									windowProject.show();
									listProject.focus();
								}
							},{operationId: "SFDA_ZQ_paymentApplicationContent"});
						}
					} */
				//},
				required:true			
			},
			{name:"projectName",title:"��Ŀ����",width:"*", editorType:"TextItemAddIcon",
				editorProperties:{
					keyPress: function(item, form, keyName){
						if (keyName == 'Enter'){
							var grid = item.grid;
							
							var recordInMainList = {};
							
							if (grid.getEditedRecord(grid.getEditRow()) != null){
								recordInMainList = grid.getEditedRecord(grid.getEditRow());
							}
							var oldProjectID = recordInMainList.projectEstablishmentID;
							var listProject = isc.M3ListGrid.create({
								width: "100%",
								height: "100%",
								recordDoubleClick: function (viewer, record, recordNum, field, fieldNum, value, rawValue){
									if (oldProjectID!=record.projectEstablishmentID){
										grid.setEditValue(item.rowNum, grid.getFieldNum("projectDetailName"), '');
										grid.setEditValue(item.rowNum, grid.getFieldNum("ImplementWay"), '');
										grid.setEditValue(item.rowNum, grid.getFieldNum("projectDetailID"), '');										
									}									
									grid.setEditValue(item.rowNum, grid.getFieldNum("projectName"), record.projectName);
									grid.setEditValue(item.rowNum, grid.getFieldNum("projectEstablishmentID"), record.projectEstablishmentID);
									grid.setEditValue(item.rowNum, grid.getFieldNum("budgetProperties"), record.budgetProperties);
									grid.data[item.rowNum].projectName = record.projectName;
									
									viewer.topElement.hide();
									
									grid.endEditing();
									// grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
									grid.startEditing(item.rowNum, grid.getFieldNum('clearingForm'));
								},
								
								fields: [
									{name:"projectNo",title:"��Ŀ���", width: 120},
									{name:"projectName",title:"��Ŀ����",width:"*"},
									{name:"projectTotalAmount",title:"��Ŀ���",width:120,type:'float', formatCellValue: "isc.Format.toUSString(value, 2)"},
									{name:"usedAmount",title:"��ʹ�ý��",width:120,type:'float', formatCellValue: "isc.Format.toUSString(value, 2)"},
									{name:"inTransitAmount",title:"��;���",width:120,type:'float', formatCellValue: "isc.Format.toUSString(value, 2)"},
									{name:"remainingAmount", title: "ʣ����",width:120,type:'float', formatCellValue: "isc.Format.toUSString(value, 2)"},
									{name:"projectEstablishmentID", showIf: "false"},
									{name:"budgetProperties", showIf: "false"},
									{name:"YSKMMC",title:"Ԥ���Ŀ����",width:100,showIf: "false"},
									{name:"KMYSJE",title:"��ĿԤ����",width:100,type:'float', formatCellValue: "isc.Format.toUSString(value, 2)", showIf: "false"},
									{name:"KMSYJE",title:"��Ŀʹ�ý��",width:100,type:'float', formatCellValue: "isc.Format.toUSString(value, 2)", showIf: "false"},
									{name:"KMYE", title: "��Ŀ���",width:100,type:'float', formatCellValue: "isc.Format.toUSString(value, 2)", showIf: "false"}
								]
							});
							
							var windowProject = isc.Window.create({
							    title: "ѡ����Ŀ",
							    autoSize:true,
							    autoCenter: true,
							    isModal: true,
							    showModalMask: true,
							    autoDraw: false,
							    showMinimizeButton: false,
							    items:[
								isc.VLayout.create({
									width: 900, 
									height: 370,
									members:[listProject]
								})
							    ]
							});
							
							isc.DataSource.get("T_departmentFilesDS").fetchData(
							{
								workingYears: $GZNY,
								departmentNo: layout.innerForm.getValue("departmentNo"),
								databaseName: $databaseName,
								projcetName: recordInMainList.projectName,
								applicationFormNo:null,
								applicationType:layout.innerForm.getValue("applicationType"),
								applicationClassification:recordInMainList.applicationClassification
							},
							function (dsResponse, data){
								if (data.length > 0){
									listProject.setData(data);
									listProject.selectRecord(0);
									windowProject.show();
									listProject.focus();
								} else {
									isc.say(
									"�������Ŀ��������������롣",
									function(){
										item.selectValue();
									}
									);
								}
							},
							{operationId: "SFDA_ZQ_XMXZ"}
							);
						}
					}
				},
				required:true
			},
			{name:"projectDetailID",title:"",width:1,showIf:"true"},
			{name:"projectDetailName",title:"��Ŀ��ϸ",width:"*",defaultValue:" ",editorType:"TextItemAddIcon", 
				editorProperties:{
					keyPress: function(item, form, keyName){
						if (keyName == 'Enter'){
							var grid = item.grid;
							
							var recordInMainList = {};
							
							if (grid.getEditedRecord(grid.getEditRow()) != null){
								recordInMainList = grid.getEditedRecord(grid.getEditRow());
							}
							
							var listProject = isc.M3ListGrid.create({
								width: "100%",
								height: "100%",
								recordDoubleClick: function (viewer, record, recordNum, field, fieldNum, value, rawValue){
									grid.setEditValue(item.rowNum, grid.getFieldNum("projectDetailName"), record.projectDetailName);
									grid.setEditValue(item.rowNum, grid.getFieldNum("ImplementWay"), record.ImplementWay);
									grid.setEditValue(item.rowNum, grid.getFieldNum("projectDetailID"), record.projectDetailID);
									grid.setEditValue(item.rowNum, grid.getFieldNum("ImplementWayStandard"), record.ImplementWayStandard);
									grid.data[item.rowNum].ImplementWayStandard = record.ImplementWayStandard;									
									grid.data[item.rowNum].projectDetailName = record.projectDetailName;
									
									viewer.topElement.hide();
									
									grid.endEditing();
									
									grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
								},
								
								fields: [
									{name:"projectDetailName",title:"��Ŀ��ϸ����", width: 180},
									{name:"ImplementWay",title:"�ɹ���ʽ",width:100},
									{name:"YE", title: "ʣ����",width:150,type:'float', formatCellValue: "isc.Format.toUSString(value, 2)"},
									{name:"ImplementWayStandard",title:"��Ӧ�淶",width:"*"},
									{name:"projectDetailID", showIf: "false"}
								]
							});
							
							var windowProject = isc.Window.create({
							    title: "ѡ����Ŀ",
							    autoSize:true,
							    autoCenter: true,
							    isModal: true,
							    showModalMask: true,
							    autoDraw: false,
							    showMinimizeButton: false,
							    items:[
								isc.VLayout.create({
									width: 500, 
									height: 370,
									members:[listProject]
								})
							    ]
							});
							
							isc.DataSource.get("T_departmentFilesDS").fetchData(
							{
								GZNY: $GZNY,
								departmentNo: layout.innerForm.getValue("departmentNo"),
								databaseName: $databaseName,
								projectEstablishmentID: recordInMainList.projectEstablishmentID,
								applicationType:layout.innerForm.getValue("applicationType"),
								applicationClassification:recordInMainList.applicationClassification

							},
							function (dsResponse, data){
								if (data.length > 0){
									listProject.setData(data);
									listProject.selectRecord(0);
									windowProject.show();
									listProject.focus();
								} else {
									isc.say(
									"�������ϸ��������������롣",
									function(){
										item.selectValue();
									}
									);
								}
							},
							{operationId: "SCW_projectDetail_Fetch"}
							);
							/****/
						}
					}
				},
				required:true
			},	
			{name:"ImplementWay",title:"�ɹ���ʽ",width:100,canEdit:true,editorType:"TextItemAddIcon", editorProperties:{ //showIf:"false",
				keyPress: function(item, form, keyName){
					if (keyName == 'Enter'){
						var grid = item.grid;
						
						var recordInMainList = {};
						
						if (grid.getEditedRecord(grid.getEditRow()) != null){
							recordInMainList = grid.getEditedRecord(grid.getEditRow());
						}
						
						var listTemp = isc.M3ListGrid.create({
							width: "100%",
							height: "100%",
							recordDoubleClick: function (viewer, record, recordNum, field, fieldNum, value, rawValue){
								grid.setEditValue(item.rowNum, grid.getFieldNum("ImplementWay"), record.name);
								grid.setEditValue(item.rowNum, grid.getFieldNum("ImplementWayStandard"), record.ImplementWayStandard);
								grid.data[item.rowNum].ImplementWay = record.name;
								grid.data[item.rowNum].ImplementWayStandard = record.ImplementWayStandard;
								
								viewer.topElement.hide();
								
								grid.endEditing();
								
								grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
							},
							
							fields: [
								{name:"name",title:"�ɹ���ʽ",width:100},
								{name:"ImplementWayStandard",title:"��Ӧ�淶",width:"*"}
							]
						});
						
						var windowTemp = isc.Window.create({
							title: "ѡ��ɹ���ʽ",
							autoSize:true,
							autoCenter: true,
							isModal: true,
							showModalMask: true,
							autoDraw: false,
							showMinimizeButton: false,
							items:[
							isc.VLayout.create({
								width: 500, 
								height: 370,
								members:[listTemp]
							})
							]
						});
						
						isc.DataSource.get("T_applicationFormHeadDS").fetchData(
						{
							databaseName: $databaseName,
							ImplementWay: recordInMainList.ImplementWay

						},
						function (dsResponse, data){
							if (data.length > 0){
								listTemp.setData(data);
								listTemp.selectRecord(0);
								windowTemp.show();
								listTemp.focus();
							} else {
								isc.say(
								"�������ϸ��������������롣",
								function(){
									item.selectValue();
								}
								);
							}
						},
						{operationId: "SCW_ImplementWay_Fetch"}
						);
						/****/
					}
				}
			},
				required:true
			},			
			{name:"clearingForm",title:"֧����ʽ",width:100,editorType:"TextItemAddIcon",
	/* 			editorProperties: {
					keyPress: function(item, form, keyName){
						if (keyName == "Enter"){
							var grid = item.grid;
							
							var recordInMainList = {};
							
							if (grid.getEditedRecord(grid.getEditRow()) != null){
								recordInMainList = grid.getEditedRecord(grid.getEditRow());
							}
							
							var listClearingForm = isc.M3ListGrid.create({
								autoFitData :"vertical",
								recordDoubleClick: function (viewer, record, recordNum, field, fieldNum, value, rawValue){
									
									grid.setEditValue(item.rowNum, grid.getFieldNum("clearingForm"), record.applicationMethod);	
									grid.data[item.rowNum].clearingForm = record.applicationMethod;									
									viewer.topElement.hide();	
									grid.endEditing();
									// grid.startEditing(item.rowNum, grid.getFieldNum('applicationContent'));
									grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
								},
								
								fields: [
								{name:"applicationMethod", title:"֧����ʽ"}
						        ]
							});
							
							var windowClearingForm = isc.Window.create({
								title: "ѡ����Ŀ",
								autoSize:true,
								autoCenter: true,
								isModal: true,
								showModalMask: true,
								autoDraw: false,
								showMinimizeButton: false,
								items:[
								isc.VLayout.create({
									width: 150, 
									members:[listClearingForm]
								})
								]
							});
							
							isc.DataSource.get("T_paymentConfigDS").fetchData(
							{
								arg: recordInMainList.clearingForm
							},
							function (dsResponse, data){
								if (data.length > 0){
									listClearingForm.setData(data);
									listClearingForm.selectRecord(0);
									windowClearingForm.show();
									listClearingForm.focus();
								} else {
									isc.say(
									"�����ѡ�������������롣",
									function(){
										item.selectValue();
									}
									);
								}
							},
							{operationId: "getPaymentMethodCombobox"}
							);
						}
					}
				},showIf:"true",defaultValue:" " */
				editorProperties: {
					keyPress: function(item, form, keyName){
						if (keyName == "Enter"){
							var grid = item.grid;
							
							var recordInMainList = {};
							
							if (grid.getEditedRecord(grid.getEditRow()) != null){
								recordInMainList = grid.getEditedRecord(grid.getEditRow());
							}
							
							var listClearingForm = isc.M3ListGrid.create({
								autoFitData :"vertical",
								recordDoubleClick: function (viewer, record, recordNum, field, fieldNum, value, rawValue){
									
									grid.setEditValue(item.rowNum, grid.getFieldNum("clearingForm"), record.name);	
									grid.data[item.rowNum].clearingForm = record.name;									
									viewer.topElement.hide();	
									grid.endEditing();
									// grid.startEditing(item.rowNum, grid.getFieldNum('applicationContent'));
									grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
								},
								
								fields: [
								{name:"name", title:"֧����ʽ"}
						        ]
							});
							
							var windowClearingForm = isc.Window.create({
								title: "ѡ��֧����ʽ",
								autoSize:true,
								autoCenter: true,
								isModal: true,
								showModalMask: true,
								autoDraw: false,
								showMinimizeButton: false,
								items:[
								isc.VLayout.create({
									width: 150, 
									members:[listClearingForm]
								})
								]
							});
							
							isc.DataSource.get("T_baseInfoDS").fetchData(
							{
								typeNo:"paymentMethod"
							},
							function (dsResponse, data){
								if (data.length > 0){
									listClearingForm.setData(data);
									listClearingForm.selectRecord(0);
									windowClearingForm.show();
									listClearingForm.focus();
								} else {
									isc.say(
									"�����ѡ�������������롣",
									function(){
										item.selectValue();
									}
									);
								}
							}
							);
						}
					}
				},showIf:"true",defaultValue:" "
			},
			{name:"applicationAmount",title:"�������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",width:150,
				editorProperties: {
					keyPressFilter: "[0-9.]",
					change: function(form, item, value, oldValue){	
						var tempStr=value.toString().split('.');
						if(tempStr[1]==null){
							item.setValue(value);
						}
						else if(tempStr[2]!=null){
							isc.say('��������ж���һ��С���㣡');
							item.setValue(oldValue);						
						}
						else if(tempStr[1].length>2){                  
							isc.say('������ֻ����С�������λ��');
							item.setValue(oldValue);
						}						
					},
					keyPress: function(item, form, keyName){
						if (keyName == "Enter"){
							var grid = item.grid;
							
							if (item.validate()){
								grid.startEditing(item.rowNum, grid.getFieldNum("applicationContent"));
								// grid.startEditing(item.rowNum, grid.getFieldNum("clearingForm"));
							}
						}
					}
				},required:true
			},
			
			{name:"applicationContent",title:"��ע/˵��",width:"*",
				editorProperties: {
					hint: "��ע/˵����������120��",
					showHintInField: true,
					keyPress: function(item, form, keyName){
						if (keyName == "Enter"){
							var grid = item.grid;
							
							recordInMainList = grid.getEditedRecord(grid.getEditRow());				
							if (recordInMainList.applicationClassification && recordInMainList.projectName && recordInMainList.applicationAmount){
								if(item.rowNum == grid.getTotalRows()-1){
									if(!layout.innerForm.getValue("relateApplicationNo")){
										grid.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
										grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
									}else{
										var _values = {};
										_values.projectYear = $GZNY;
										_values.departmentNo = layout.innerForm.getValue("departmentNo");
										_values.databaseName = $databaseName;
										_values.projcetName = null;
										_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
										
										isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
											if(data.length==1){
												if(!data[0].projectEstablishmentID){}
												else{
													
													innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
												}
											}else if(data.length>1){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
											}else if(data.length==0){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:""});
											}
											hideItemField();
											grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
										},{operationId:"SFDA_ZQ_XMXZ"});
									}
									
								}else{
									if(!layout.innerForm.getValue("relateApplicationNo")){
										grid.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
										grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
									}else{
										var _values = {};
										_values.projectYear = $GZNY;
										_values.departmentNo = layout.innerForm.getValue("departmentNo");
										_values.databaseName = $databaseName;
										_values.projcetName = null;
										_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
										
										isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
											if(data.length==1){
												if(!data[0].projectEstablishmentID){}
												else{
													
													innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
												}
											}else if(data.length>1){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
											}else if(data.length==0){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:""});
											}
											hideItemField();
											grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
										},{operationId:"SFDA_ZQ_XMXZ"});
									}
									
								}
							}else{
								if(!recordInMainList.applicationClassification){
									
									isc.DataSource.get("T_departmentFilesDS").fetchData(null,function(){
										isc.say("������������д����!",function(){
											grid.startEditing(item.rowNum, grid.getFieldNum('applicationClassification'));
										});
									});
									
								}else if(!recordInMainList.projectName){
									if(grid.getFieldNum('projectName')<0&&!recordInMainList.applicationAmount){
										isc.DataSource.get("T_departmentFilesDS").fetchData(null,function(){
											isc.say("����������ݱ�����д!",function(){
												grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
											});
										});
									}if(grid.getFieldNum('projectName')<0&&recordInMainList.applicationAmount){
										if(item.rowNum == grid.getTotalRows()-1){
											if(!layout.innerForm.getValue("relateApplicationNo")){
												grid.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
												grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
											}else{
												var _values = {};
												_values.projectYear = $GZNY;
												_values.departmentNo = layout.innerForm.getValue("departmentNo");
												_values.databaseName = $databaseName;
												_values.projcetName = null;
												_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
												
												isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
													if(data.length==1){
														if(!data[0].projectEstablishmentID){}
														else{
															
															innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
														}
													}else if(data.length>1){
														
														innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
													}else if(data.length==0){
														
														innerListDetail.addData({applicationContent:"",remarks:"",subID:""});
													}
													hideItemField();
													grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
												},{operationId:"SFDA_ZQ_XMXZ"});
											}
											
										}else{
											if(!layout.innerForm.getValue("relateApplicationNo")){
												grid.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
												grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
											}else{
												var _values = {};
												_values.projectYear = $GZNY;
												_values.departmentNo = layout.innerForm.getValue("departmentNo");
												_values.databaseName = $databaseName;
												_values.projcetName = null;
												_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
												
												isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
													if(data.length==1){
														if(!data[0].projectEstablishmentID){}
														else{
															
															innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
														}
													}else if(data.length>1){
														
														innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
													}else if(data.length==0){
														
														innerListDetail.addData({applicationContent:"",remarks:"",subID:""});
													}
													hideItemField();
													grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
												},{operationId:"SFDA_ZQ_XMXZ"});
											}
											
										}
									}else if(grid.getField(grid.getFieldNum('projectName')).mustProject){
										isc.DataSource.get("T_departmentFilesDS").fetchData(null,function(){
											isc.say("������Ŀ������д����!",function(){
												grid.startEditing(item.rowNum, grid.getFieldNum('projectName'));
											});
										});
									}	
									else if(!recordInMainList.applicationAmount&&!grid.getField(grid.getFieldNum('projectName')).mustProject){
										isc.DataSource.get("T_departmentFilesDS").fetchData(null,function(){
											isc.say("����������ݱ�����д!",function(){
												grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
											});
										});
									}else{
										if(item.rowNum == grid.getTotalRows()-1){
											if(!layout.innerForm.getValue("relateApplicationNo")){
												grid.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
												grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
											}else{
												var _values = {};
												_values.projectYear = $GZNY;
												_values.departmentNo = layout.innerForm.getValue("departmentNo");
												_values.databaseName = $databaseName;
												_values.projcetName = null;
												_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
												
												isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
													if(data.length==1){
														if(!data[0].projectEstablishmentID){}
														else{
															
															innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
														}
													}else if(data.length>1){
														
														innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
													}else if(data.length==0){
														
														innerListDetail.addData({applicationContent:"",remarks:"",subID:""});
													}
													hideItemField();
													grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
												},{operationId:"SFDA_ZQ_XMXZ"});
											}
											
										}else{
											if(!layout.innerForm.getValue("relateApplicationNo")){
												grid.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
												grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
											}else{
												var _values = {};
												_values.projectYear = $GZNY;
												_values.departmentNo = layout.innerForm.getValue("departmentNo");
												_values.databaseName = $databaseName;
												_values.projcetName = null;
												_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
												
												isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
													if(data.length==1){
														if(!data[0].projectEstablishmentID){}
														else{
															
															innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
														}
													}else if(data.length>1){
														
														innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
													}else if(data.length==0){
														
														innerListDetail.addData({applicationContent:"",remarks:"",subID:""});
													}
													hideItemField();
													grid.startEditing(item.rowNum+1, grid.getFieldNum('applicationClassification'));
												},{operationId:"SFDA_ZQ_XMXZ"});
											}
											
										}
									}
									
									// isc.DataSource.get("T_departmentFilesDS").fetchData(null,function(){
										// isc.say("������Ŀ������д����!",function(){
											// grid.startEditing(item.rowNum, grid.getFieldNum('projectName'));
										// });
									// });
								}else if(!recordInMainList.applicationAmount){
																		
									isc.DataSource.get("T_departmentFilesDS").fetchData(null,function(){
										isc.say("����������ݱ�����д!",function(){
											grid.startEditing(item.rowNum, grid.getFieldNum('applicationAmount'));
										});
									});
								}
							}
						}
					}
				}		
			},
			{name:"addbtn",title:" ",width:22,showIf:"true",canEdit:false},
			{name:"delbtn",title:" ",width:22,showIf:"true",canEdit:false},
			{name:"projectEstablishmentID",title:"",width:1,showIf:"true"},
			{name:"budgetProperties",title:"",width:1,showIf:"false"},
			{name:"paymentApplicationContentID",title:"",width:1,showIf:"true"},
			{name:"correspondingStandard",title:"",width:1,showIf:"false"},
			{name:"ImplementWayStandard",title:"",width:1,showIf:"false"},
			{name:"projectNo",title:"��Ŀ���",showIf:"false"},
			{name:"remarks",title:"��ע",showIf:"false"},
			{name:"moneyRegulation",title:"�������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",
				width:1, defaultValue:0}
		],  
		createRecordComponent : function (record, colNum) {  
			var fieldName = this.getFieldName(colNum);  
			var that = this;
			if (fieldName == "addbtn") {  //&&(this.data.length-1)==this.getRecordIndex(record)
				var recordCanvas = isc.HLayout.create({
					height: 22,	align: "left"
				});

				var editImg = isc.ImgButton.create({
					showDown: false,showRollOver: false,
					layoutAlign: "center",
					src: "Victor/plus.png",
					prompt: "����һ����¼",
					height: 16,	width: 16,grid: this,
					click : function () {
						var rowNum = that.getRecordIndex(record);
						if(!record.applicationClassification){
							isc.say("������������д����",function(){
								that.startEditing(rowNum, that.getFieldNum('applicationClassification'));
							});
						}else if(!record.projectEstablishmentID){
							// isc.say("��Ŀ���Ʊ�����д����",function(){
								// that.startEditing(rowNum, that.getFieldNum('projectEstablishmentID'));
							// });
							if(that.getFieldNum('projectName')<0&&!record.applicationAmount){
								isc.say("����������ݱ�����д",function(){
									that.startEditing(rowNum, that.getFieldNum('applicationAmount'));
								});
							}if(that.getFieldNum('projectName')<0&&record.applicationAmount){
								if(rowNum == that.getTotalRows()-1){
									if(!layout.innerForm.getValue("relateApplicationNo")){
										that.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
										that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
									}else{
										var _values = {};
										_values.projectYear = $GZNY;
										_values.departmentNo = layout.innerForm.getValue("departmentNo");
										_values.databaseName = $databaseName;
										_values.projcetName = null;
										_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
										
										isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
											if(data.length==1){
												if(!data[0].projectEstablishmentID){}
												else{
													
													innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
												}
											}else if(data.length>1){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
											}else if(data.length==0){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:""});
											}
											hideItemField();
											that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
										},{operationId:"SFDA_ZQ_XMXZ"});
									}
									
								}else{
									if(!layout.innerForm.getValue("relateApplicationNo")){
										that.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
										that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
									}else{
										var _values = {};
										_values.projectYear = $GZNY;
										_values.departmentNo = layout.innerForm.getValue("departmentNo");
										_values.databaseName = $databaseName;
										_values.projcetName = null;
										_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
										
										isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
											if(data.length==1){
												if(!data[0].projectEstablishmentID){}
												else{
													
													innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
												}
											}else if(data.length>1){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
											}else if(data.length==0){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:""});
											}
											hideItemField();
											that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
										},{operationId:"SFDA_ZQ_XMXZ"});
									}
									
								}
							}else if(that.getField(that.getFieldNum('projectName')).mustProject){
								isc.say("��Ŀ���Ʊ�����д����",function(){
									that.startEditing(rowNum, that.getFieldNum('projectName'));
								});
							}	
							else if(!record.applicationAmount&&!that.getField(that.getFieldNum('projectName')).mustProject){
								isc.say("����������ݱ�����д",function(){
									that.startEditing(rowNum, that.getFieldNum('applicationAmount'));
								});
							}else{
								if(rowNum == that.getTotalRows()-1){
									if(!layout.innerForm.getValue("relateApplicationNo")){
										that.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
										that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
									}else{
										var _values = {};
										_values.projectYear = $GZNY;
										_values.departmentNo = layout.innerForm.getValue("departmentNo");
										_values.databaseName = $databaseName;
										_values.projcetName = null;
										_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
										
										isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
											if(data.length==1){
												if(!data[0].projectEstablishmentID){}
												else{
													
													innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
												}
											}else if(data.length>1){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
											}else if(data.length==0){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:""});
											}
											hideItemField();
											that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
										},{operationId:"SFDA_ZQ_XMXZ"});
									}
									
								}else{
									if(!layout.innerForm.getValue("relateApplicationNo")){
										that.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
										that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
									}else{
										var _values = {};
										_values.projectYear = $GZNY;
										_values.departmentNo = layout.innerForm.getValue("departmentNo");
										_values.databaseName = $databaseName;
										_values.projcetName = null;
										_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
										
										isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
											if(data.length==1){
												if(!data[0].projectEstablishmentID){}
												else{
													
													innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
												}
											}else if(data.length>1){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
											}else if(data.length==0){
												
												innerListDetail.addData({applicationContent:"",remarks:"",subID:""});
											}
											hideItemField();
											that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
										},{operationId:"SFDA_ZQ_XMXZ"});
									}
									
								}
								
							}
						}else
						if(!record.applicationAmount){
							isc.say("����������ݱ�����д",function(){
								that.startEditing(rowNum, that.getFieldNum('applicationAmount'));
							});
						}else{
						
							
							if(!layout.innerForm.getValue("relateApplicationNo")){
								that.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
								that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
							}else{
								var _values = {};
								_values.projectYear = $GZNY;
								_values.departmentNo = layout.innerForm.getValue("departmentNo");
								_values.databaseName = $databaseName;
								_values.projcetName = null;
								_values.applicationFormNo = layout.innerForm.getValue("relateApplicationNo");
								
								isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
									if(data.length==1){
										if(!data[0].projectEstablishmentID){}
										else{
											
											innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
											that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
										}
									}else if(data.length>1){
										
										innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectEstablishmentID:data[0].projectEstablishmentID,projectName:data[0].projectName});
										that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
									}else if(data.length==0){
										
										innerListDetail.addData({applicationContent:"",remarks:"",subID:"",projectName:""});
										that.startEditing(rowNum+1, that.getFieldNum('applicationClassification'));
									}
									hideItemField();
								},{operationId:"SFDA_ZQ_XMXZ"});
							}
						}
					
					}
				});
				recordCanvas.addMember(editImg);  
				return recordCanvas;  
			} 
			else if (fieldName == "delbtn") {  
				var recordCanvas = isc.HLayout.create({
					height: 22,	align: "left"
				});

				var editImg = isc.ImgButton.create({
					showDown: false,showRollOver: false,
					layoutAlign: "center",
					src: "Victor/minus.png",
					prompt: "ɾ����¼",
					height: 16,	width: 16,grid: this,
					click : function () {
						for(var i = 0;i < that.data.length;i++){
							if(i>0){
								isc.confirm("��ȷ��Ҫɾ����?",function(value){
									if(value){
										that.removeData (that.getRecord (that.getRecordIndex(record)));
									}
								})
								}else{
								isc.say('������Ҫ����һ������');
							}
						}
					}
				});
				recordCanvas.addMember(editImg);  
				return recordCanvas;  
			}else {  
				return null;  
			}  
		},

		initWidget : function () {
			this.Super("initWidget", arguments);
	
		},
		cellHoverHTML :function(record, rowNum, colNum){

		},
		canHover :true,showHoverComponents: true,hoverWidth:400,
		getCellHoverComponent : function (record, rowNum, colNum) {
			var me = this;
			if(me.getFieldName (colNum)=="ImplementWay"){
				this.rowHoverComponent = isc.DetailViewer.create({
					fields: [{name:"ImplementWayStandard",title:"�ɹ���Ŀ���ϱ�׼"}],
					// height:"100%",
					autoFitData :"vertical",
					initWidget : function () {
						this.Super("initWidget", arguments);
						var it = this;
						// alert(me.getFieldName (colNum));
						if(record.ImplementWayStandard&&ImplementWayStandard==""){
							it.setData({ImplementWayStandard:record.ImplementWayStandard});
						}else if(ImplementWayStandard!=""){
							it.setData({ImplementWayStandard:ImplementWayStandard});
						}
					}
				});				
			}
			else{			
				this.rowHoverComponent = isc.DetailViewer.create({
					fields: [{name:"correspondingStandard",title:"����������д����"}],
					// height:"100%",
					autoFitData :"vertical",
					initWidget : function () {
						this.Super("initWidget", arguments);
						var it = this;
						if(me.getFieldName (colNum)!="delbtn"&&me.getFieldName (colNum)!="addbtn"){
							
							if(record.correspondingStandard&&correspondingStandard==""){
								it.setData({correspondingStandard:record.correspondingStandard});
							}else if(correspondingStandard!=""){
								it.setData({correspondingStandard:correspondingStandard});
							}
						}
					}
				});
			}
			return this.rowHoverComponent;
			
		},
		editorExit :function(editCompletionEvent, record, newValue, rowNum, colNum){
			if (record){
				if (this.getFieldName(colNum) ==  "projectName"){
					if (record.projectName != null){
						this.setEditValue(rowNum, colNum, record.projectName);
					}else{
						this.setEditValue(rowNum, colNum, "");
					}
				}
				
				if (this.getFieldName(colNum) ==  "projectDetailName"){
					if (record.projectDetailName != null){
						this.setEditValue(rowNum, colNum, record.projectDetailName);
					}else{
						this.setEditValue(rowNum, colNum, "");
					}
				}	
		

				if (this.getFieldName(colNum) ==  "ImplementWay"){
					if (record.ImplementWay != null){
						this.setEditValue(rowNum, colNum, record.ImplementWay);
					}else{
						this.setEditValue(rowNum, colNum, "");
					}
				}		
				
				if (this.getFieldName(colNum) ==  "applicationClassification"){
					if (record.applicationClassification != null){
						this.setEditValue(rowNum, colNum, record.applicationClassification);
					}else{
						this.setEditValue(rowNum, colNum, "");
					}
				} //clearingForm
				if (this.getFieldName(colNum) ==  "clearingForm"){
					if (record.clearingForm != null){
						this.setEditValue(rowNum, colNum, record.clearingForm);
					}else{
						this.setEditValue(rowNum, colNum, "");
					}
					
				}
				//clearingForm
			}
			
			if(!this.validateCell(rowNum, "applicationAmount")){
				this.setEditValue(rowNum, colNum, 0);
			}
		},
		editComplete :function(rowNum, colNum, newValues, oldValues, editCompletionEvent){
			var bxlbCol = this.getFieldNum("applicationClassification");
			var bxnrCol = this.getFieldNum("applicationContent");
			var moneyCol = this.getFieldNum("applicationAmount");
			// var totalMoney = this.getGridSummary(this.getField(moneyCol))[0];
			var totalMoney = 0;
			// alertAll(innerListDetail.data.length);
			
			totalMoney = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
			
			/* if(!layout.innerForm.getValue("loanNo")){
				totalMoney = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
			}else{
				for(var i=0;i<innerListDetail.data.length;i++){
					if(innerListDetail.data[i].clearingForm=="�ֽ�"){
						totalMoney = totalMoney + innerListDetail.data[i].applicationAmount
					}
				}
			} */
			var loanTotal = 0;
			for(var i=0;i<innerListDetail.data.length;i++){
				if(innerListDetail.data[i].clearingForm=="�ֽ�"){
					loanTotal = loanTotal + innerListDetail.data[i].applicationAmount
				}
			}
			
			var loanTotalAmount = layout.innerForm.getValue("loanTotalAmount");
			
			var returnedAmount=0,additionalAmount=0;
			var balance = parseFloat(loanTotalAmount) - parseFloat(loanTotal);
			if(!loanTotalAmount){
				balance = 0;
			}
			layout.innerForm.setValue("reimbursementAmount",parseFloat(totalMoney));
			if(balance>0){
				layout.innerForm.setValue("returnedAmount",balance);
				layout.innerForm.setValue("additionalAmount",0);
			}else{
				layout.innerForm.setValue("returnedAmount",0);
				layout.innerForm.setValue("additionalAmount",Math.abs(balance));
			}
			
		}
	
	});
	
	var getBudgetDetail = function(record){
		var detailFields = [
			{name:"subID",showIf:"false"},
			{name:"applicationClassification",title:"�������",width:120},
			{name:"applicationContent",title:"��������",width:"*",required:true},
			{name:"projectName",title:"��Ŀ����",width:"*"},
			{name:"projectDetailName",title:"��Ŀ��ϸ", width:"*"},
			{name:"ImplementWay",title:"�ɹ���ʽ",width:120},
			{name:"projectDetailID", showIf: "false"},				
			{name:"applicationAmount",title:"Ԥ����",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",
				width:100,defaultValue:0,summaryFunction:"sum"
			},
			{name:"moneyRegulation",title:"�������",type:"float", formatCellValue: "isc.Format.toUSString(value,2)",
				width:100,defaultValue:0,summaryFunction:"sum"
			},
			{name:"clearingForm",title:"���㷽ʽ",width:80,type:"select",showIf:"false"},
			{name:"addbtn",title:" ",width:22,showIf:"false",canEdit:false},
			{name:"delbtn",title:" ",width:22,showIf:"false",canEdit:false},
			{name:"projectEstablishmentID",title:"",width:1,showIf:"false"},
			{name:"budgetProperties",title:"",width:1,showIf:"false"},
			{name:"paymentApplicationContentID",title:"",width:1,showIf:"false"},
			{name:"correspondingStandard",title:"",width:1,showIf:"false"},
			{name:"projectNo",title:"��Ŀ���",showIf:"false"},
			{name:"remarks",title:"��ע",showIf:"false"}
		];
		// alertAll(record);
		var workFlowImage = isc.M3FlowShow.create({
			hideButton:true,
			getCriteria:function(){
				var values = {};
				values.itemID = -1;
				values.itemType = "����Ԥ������";
				values.applicationType = "����Ԥ������";
				try{
					if(record.relateApplicationNo){
						values.itemID = record.relateSubID;
						values.itemType = record.relateItemType;
						values.applicationType = record.relateApplicationType;
					}
				}catch(e){}
				// alertAll(values);
				return values;
			},
			setAction:function(){
			
			}
			
		});
		
		var detailList = isc.M3ListGrid.create({
			width:"100%",height:"100%",
			dataSource:"T_applicationFormDtDS",
			fields:detailFields,
			initWidget : function () {
				this.Super("initWidget", arguments);
				var it = this;
				if(record){
					if(record.relateApplicationNo){
						isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:record.relateApplicationNo,active:1},function(dsResponse,data){
							// it.invalidateCache();
							it.fetchData({headSubID:data[0].subID,active:1});
						});
					}
					
				}else this.setData([]);
			},
			getCellCSSText: function (record, rowNum, colNum) {
				if (this.getFieldName(colNum) == "moneyRegulation") {
					if (record.moneyRegulation != record.applicationAmount) {
						return "font-weight:bold; color:red;";
					} 
				}
			}
		});
		
		var tlayout = isc.VLayout.create({
			width:"100%",height:"100%",
			members:[workFlowImage,detailList]
		});
		
		return tlayout;
	};
	
	var getHistoryList = function(record){
		var historyFields = [
			{name:"auditInfoID",showIf:"false"},
			{name:"auditInfodate",title:"�������",dateFormatter:"toJapanShortDatetime",width:150},
			{name:"operator",showIf:"false"},
			{name:"workStation",showIf:"false"},
			{name:"itemType",title:"��������",showIf:"true",width:80},
			{name:"itemID",showIf:"false"},
			{name:"auditorType",title:"�������",showIf:"true",width:70},
			{name:"auditorClass",showIf:"false"},
			{name:"auditorOrder",showIf:"false"},
			{name:"staffDepartmentNo",showIf:"false"},
			{ name:"staffDepartmentName",title:"��������", width:150,showIf:"false"},
			
			{name:"auditorDepartName",title:"��������",showIf:"false"},
			{name:"auditorDuty",title:"ְ��",showIf:"false",width:80},
			{name:"auditorDepartNo",showIf:"false"},
		
			{name:"auditorName",title:"�����",width:70},
			{name:"auditorUserNo",showIf:"false"},
			{name:"auditorUserName",showIf:"false"},
			{name:"auditOpinion",title:"���״̬",width:80},
			{name:"auditRemarks",title:"������"},
			{name:"moneyRegulation",title:"�������",type:"float",width:100, formatCellValue: "isc.Format.toUSString(value,2)"}
		]
		
		var historyList = isc.M3ListGrid.create({
			width:"100%",height:"100%",
			fields:historyFields,
			initWidget : function () {
				this.Super("initWidget", arguments);
				var it = this;
				if(record){
				// alertAll(record);
					isc.DataSource.get("T_applicationFormHeadDS").fetchData({itemID:record.subID,relateNo:record.relateApplicationNo},function(dsResponse,data){
						it.setData(data);
					},{operationId:"SFDA_auditFlow_auditHistory"});
				}
			}
		});
		
		return historyList;
	};
	
	var getNewLayout = function(record){
		/*����ģ��*/
		var innerAttachment = isc.M3Attachment.create({
			width:"100%",height:"100%",
			dataSource:"T_attachmentInfoUseDS",
			getPickListFilterCriteria : function () {
				var itemType,correspondingNo,values={};
				values.operator = $userName;
				values.workStation = $randomWorkStation;
				if(record){
					values.applicationNo = record.applicationNo;
					values.loanNo = record.loanNo;
					values.auditorType = '';
					values.correspondingNo = record.subID;
					values.itemType = record.applicationType;
				}else{
					values.initCache = true;
					values.applicationNo = "";
					values.loanNo = "";
					values.auditorType = '';
					values.correspondingNo = -1;
					values.itemType = args;
				}
				// alertAll(values);
				return values;
			},
			callback:function(dsResponse,data,dsRequest){},
			initFetchData:function(mrecord){
				var it = this;
				var values = {};
				values.applicationNo = mrecord.applicationNo;
				values.loanNo = mrecord.loanNo;
				values.operator = mrecord.operator;
				values.workStation = mrecord.workStation;
				values.auditorType = mrecord.auditorType;
				values.correspondingNo = mrecord.correspondingNo;
				values.itemType = mrecord.itemType;
				isc.DataSource.get("T_attachmentInfoUseDS").fetchData(values,function(dsResponse,data){
					it.topTile.setData(data);
				},{operationId:"SFDA_attachment_reimburseFetch"});
			
			},
			finallyFetchData:function(mrecord){
				var it = this;
				var values = {};
				values.applicationNo = mrecord.applicationNo;
				values.loanNo = mrecord.loanNo;
				values.operator = mrecord.operator;
				values.workStation = mrecord.workStation;
				values.auditorType = mrecord.auditorType;
				values.correspondingNo = mrecord.correspondingNo;
				values.itemType = mrecord.itemType;
				isc.DataSource.get("T_attachmentInfoUseDS").fetchData(values,function(dsResponse,data){
					it.topTile.setData(data);
				},{operationId:"SFDA_attachment_reimburseFetch"});
			}
		});
		innerAttachment.topTile.invalidateCache();

		var msgLayout = isc.M3Message.create({
			height:"100%",width:"100%",
			getPickListFilterCriteria : function () {
				var values={};
				if(record){
					values.itemID = record.subID;
					values.itemType = record.itemType;
					values.applicationType = record.applicationType;
					values.relateNo = record.relateApplicationNo;
				}else{
					values.itemID = -1;
					values.itemType = args;
					values.applicationType = args;
					values.relateNo = '';
				}
				return values;
			}
		});

		/*tabģ��*/
		var innerTab = isc.TabSet.create({
			width:"100%",height:"500%",
			tabBarPosition: "top",
			tabSelected :function(tabNum, tabPane, ID, tab){
				if(ID == 'msgLayout04'){
					if(record){
						realtimeMessagingDS.fetchData({itemID:record.subID, itemType:record.itemType, applicationType:record.applicationType, userName:$name},
							function(dsResponse, data){
								// naviPane.refreshStatus();
								msgLayout.chatLog.chatLogInit();
							},{operationId:"SFDA_X_updateMessageReadStatus"}
						);
					}
				}
			}
		});

		var itemID,itemType,budgetDetail;
		if(record){
			budgetDetail = getBudgetDetail(record);
			itemID = record.subID;
			itemType = record.applicationType;
		}else{
			budgetDetail = getBudgetDetail();
			itemID = "-1";
			itemType=args;
		}

		initProject();
 		if(!record){
			innerListDetail.setData([{applicationContent:"",remarks:"",subID:"",projectName:""}]);
		}else if(null==record.showDetail){
			innerListDetail.setData([{applicationContent:"",remarks:"",subID:"",projectName:""}]);
		}
		var historyList = getHistoryList(record);

		var m = new Map(),n = new Map(),x = new Map(),y = new Map(),z = new Map(),o = new Map();
		m.put("title","��ϸ����");
		m.put("pane",innerListDetail);

		n.put("title","�����ϴ�");
		n.put("pane",innerAttachment);
		
		x.put("title","�������");
		x.put("pane",historyList);
		
		y.put("title","ƾ֤Ԥ��");

		z.put("ID","msgLayout04");
		z.put("title","�Ի�����");
		z.put("pane",msgLayout);
		
		o.put("title","Ԥ����ϸ");
		o.put("pane",budgetDetail);
		
		innerTab.addTab(m.data);
		innerTab.addTab(n.data);
		
		innerTab.addTab(x.data);
		// innerTab.addTab(y.data);
		innerTab.addTab(z.data);
		innerTab.addTab(o.data);
		
		var criteriaGIF = {};
		
		if(record){
			criteriaGIF.itemID = record.subID;
			criteriaGIF.itemType = record.itemType;
			criteriaGIF.applicationType = record.applicationType;
		}else{
			criteriaGIF.itemID = -1;
			criteriaGIF.itemType = "";
			criteriaGIF.applicationType = "";
		}
		criteriaGIF.userName = $name;
		isc.DataSource.get("T_applicationFormHeadDS").fetchData(criteriaGIF,function(dsResponse,data){
			if(!data[0].messageInfo){
				
			}else{
				innerTab.setTabIcon(innerTab.tabs[3],data[0].messageInfo+".gif");	
			}
		},{operationId:"SFDA_X_getMyMessageStatus"});
		
		// detailģ�����
		layout.innerDetailLayout.setMembers([hlayout,innerTab]);
		
		var workFlowImage = isc.M3FlowShow.create({
			getCriteria:function(){
				var values = {};
				
				if(record){
					values.itemID = record.subID;
					values.itemType = record.itemType;
					values.applicationType = record.applicationType;
				
				}else{
					values.itemID = -1;
					values.itemType = args;
					values.applicationType = args;
				}
				// alertAll(record);
				return values;
			},
			setAction:function(){
				if(record){
					var that = layout;
					
					var auditFields = [
						{name:"userName",title:"userName",width:"*",showIf:"false"},
						{name:"auditOpinion",title:"������",width:"*",showIf:"false"},
						{name:"applyStyle",title:"��������",width:"*",showIf:"false"},
						{name:"XH",title:"����",width:80,canEdit:false},
						{name:"auditorType",title:"�������",width:120,canEdit:true,type:"select", editorProperties:{ //showIf:"false",
							optionDataSource:"T_baseInfoDS",//required:true,
							valueField:"name",displayField:"name",
							pickListWidth:200,
							// optionCriteria :{typeNo:"auditType"},
							pickListFields: [
								//{ name:"no",title:"���", width:"*"},
								{ name:"name",title:"�������", width:"*"}
							]
							,
							getPickListFilterCriteria : function () {
								return {typeNo:"auditType"};
							}
						}},
						{name:"auditorClass",title:"���Ȩ��",width:"*",showIf:"false"},
						{name:"auditorOrder",title:"���",width:30,canEdit:false,showIf:"false"},
						{name:"auditorDepartNo",title:"���ű��",width:"*",showIf:"false"},
						{name:"auditorDepartName",title:"�ֹܲ�������",width:200,canEdit:false,showIf:"false"},
						{name:"staffDepartmentNo",showIf:"false"},
						{name:"staffDepartmentName",title:"�ֹܲ�������",width:100,canEdit:false},
						{name:"auditorName",title:"�����Ա",width:100,canEdit:true,type:"select", editorProperties:{ 	
							optionDataSource:"T_applicationFormHeadDS",
							optionOperationId:"SP_CAUTHORITYNAME",
							valueField:"staffName",
							pickListWidth:400,
							pickListFields: [
								{ name:"staffId",title:"��Ա���", width:"*",showIf:"false"},
								{ name:"parentId",title:"��Ա���", width:"*",showIf:"false"},
								{ name:"countId",title:"��Ա���", width:"*",showIf:"false"},
								{ name:"staffNo",title:"��Ա���", width:"*",showIf:"false"},
								{ name:"staffName",title:"��Ա����", width:"*"},
								{ name:"departmentNo",title:"���ű��", width:"*",showIf:"false"},
								{ name:"departmentName",title:"��������", width:"*",showIf:"false"},
								{name:"staffDepartmentNo",showIf:"false"},
								{ name:"staffDepartmentName",title:"��������", width:"*"},
								{ name:"post",title:"ְ��",width:"*"}
							],
							getPickListFilterCriteria: function(){
								var rowNum = auditList.getEditRow();
								var record = auditList.getRecord(rowNum);
								var values = {};
								values.departmentNo = record.auditorDepartNo;
								values.departmentName = record.auditorDepartName;
								values.auditorType = record.auditorType;
								if(!record.auditorDuty){
									values.job = "";
								}else{
									values.job = record.auditorDuty;
								}
								if(!record.applyStyle){
									values.applyStyle = "";
								}else{
									values.applyStyle = record.applyStyle;
								}
								return values;
							},changed :function(form, item, value){
								var rowNum = auditList.getEditRow();
								// var colNum = auditList.getFieldNum("");
								var values ={},selectedRecord = this.getSelectedRecord();

								values.auditorDepartNo = selectedRecord.departmentNo;
								values.auditorDepartName = selectedRecord.departmentName;
								values.auditorDuty = selectedRecord.post;
								values.auditorName = selectedRecord.staffName;
								values.auditorUserNo = selectedRecord.staffNo;
								values.auditorUserName = selectedRecord.userName;
								values.controlType = "����";
								auditList.setEditValues  (rowNum,values);
							}
						}},
						{name:"controlType",title:"��������",width:100,canEdit:false},
						{name:"auditorUserNo",title:"�����Ա���",width:"*",showIf:"false"},
						{name:"addbtn",title:" ",width:22,showIf:"true",canEdit:false},
						{name:"delbtn",title:" ",width:22,showIf:"true",canEdit:false},
						{name:"auditorUserName",title:"�����ʺ�",width:"*",showIf:"false"}
					];
					var auditList = isc.M3ListGrid.create({
						width:"100%",height:370,
						fields:auditFields,
						groupStartOpen:"all",
						groupByField: 'XH',
						modalEditing :true,
						initWidget : function () {
							this.Super("initWidget", arguments);
							var it = this;
							isc.DataSource.get("T_applicationFormHeadDS").fetchData(that.innerForm.values,function(dsResponse,data){
								it.setData(data);
								auditWin.saveBtn.setDisabled(false);
							},{operationId:"SFDA_applicationFlow_auditInfoMSG"});
							// isc.DataSource.get("T_applicationFormHeadDS").fetchData(that.innerForm.values,function(dsResponse,data){
								// it.setData(data);
							// },{operationId:"sp_ctempleAuditList_New"});
						},
						showRecordComponents: true,  		
						showRecordComponentsByCell: true,  
						createRecordComponent : function (record, colNum) {  
							var fieldName = this.getFieldName(colNum);  
							var that = this;
							if (fieldName == "addbtn") {  //&&(this.data.length-1)==this.getRecordIndex(record)
								var recordCanvas = isc.HLayout.create({
									height: 22,	align: "left"
								});
								var editImg = isc.ImgButton.create({
									showDown: false,showRollOver: false,
									layoutAlign: "center",
									src: "Victor/plus.png",
									prompt: "����һ����¼",
									height: 16,	width: 16,grid: this,
									click : function () {
										var auditorType = record.auditorType,maxId=0;
										var mdata = that.originalData;
										// var rowNum = that.getRecordIndex(record);
										var rowNum = mdata.indexOf(record);
										
										var newArr = [];
										for(var i=0;i<mdata.length;i++){
											
											if(rowNum>=i){
												newArr.add(mdata[i]);
												if(rowNum==i){
													var _data = {};
													_data.auditorOrder = record.auditorOrder+1;
													_data.auditorClass = "����";
													_data.auditorDepartNo = record.auditorDepartNo;
													_data.auditorDepartName = record.auditorDepartName;
													_data.applyStyle = '';
													_data.auditorType = record.auditorType;
													_data.auditorDuty = '';
													_data.userName = $userName;
													_data.XH = record.XH;
													newArr.add(_data);
												}
											}else if(rowNum<i){
												if(mdata[i].auditorType == auditorType){
													mdata[i].auditorOrder = mdata[i].auditorOrder+1;
												}
												newArr.add(mdata[i]);
											}
										}
										
										that.setData(newArr);
										// that.startEditing(rowNum+2, that.getFieldNum('auditorName'));
										that.invalidateCache();
									}
								});
								recordCanvas.addMember(editImg);  
								return recordCanvas;  
							} 
							else if (fieldName == "delbtn") {  //&&(this.data.length-1)==this.getRecordIndex(record)
								var recordCanvas = isc.HLayout.create({
									height: 22,	align: "left"
								});

								var editImg = isc.ImgButton.create({
									showDown: false,showRollOver: false,
									layoutAlign: "center",
									src: "Victor/minus.png",
									prompt: "ɾ����¼",
									height: 16,	width: 16,grid: this,
									click : function () {
										isc.confirm("��ȷ��Ҫɾ����?",function(value){
											if(value){
												auditList.removeData (auditList.getRecord (auditList.getRecordIndex(record)));
											}
											
										});
									}
								});
								if(record.auditorClass=="����"||!record.auditorName){
									recordCanvas.addMember(editImg);  
								}
								// recordCanvas.addMember(editImg);  
								return recordCanvas;  
							}else {  
								return null;  
							}  
						},
						canEditCell : function (rowNum, colNum) {
							var mRecord = this.getRecord(rowNum);
							var fieldName = this.getFieldName(colNum);
							if (fieldName == "auditorName"&&mRecord.auditorClass=="��Ա") {
								return false;   
							}
							return this.Super("canEditCell", arguments);
						}
					});
					var auditWin = isc.M3Windows.create({
						title:"�����Ա",
						saveAction:function(){
							
							var mdata = auditList.originalData;
							for(var i=0;i<mdata.length;i++){
								if(mdata[i].auditorName==""||!mdata[i].auditorName){
									isc.say("��������Ա��д����,������������Ѹü�¼ɾ��!");return;
								}
							}
							var _xml = toXmlForDataFilter(auditList.originalData,auditFields);
							// alertAll(_xml);return;
							var values = {};
							values.operator = $userName;
							values.workStation = $hostNameLocal;
							values.databaseName = $databaseName;
							// alertAll(1);
							values.applicationType = layout.innerForm.getValue("applicationType");
							values.xml = _xml;
							values.itemID = record.subID;
							
							var amountTotalInput = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0].toFixed(2);
							var budgetTotal = layout.innerForm.getValue("relateApAmountT").toFixed(2);
							var surplus = layout.innerForm.getValue("surplus").toFixed(2);
							
							if(!layout.innerForm.getValue("relateApplicationNo")){
								values.itemType = "��Ԥ�㱨����";
							}else if(amountTotalInput<=surplus){
								values.itemType = "��Ԥ�㱨����";
							}else if(amountTotalInput>surplus){
								values.itemType = "��Ԥ�㱨����";
							}
							values.actionStyle = "�޸�";
							isc.DataSource.get("T_applicationFormHeadDS").fetchData(values,function(dsResponse,data){						
								auditWin.window.hide();
								record.applicationNo = layout.innerForm.getValue("relateApplicationNo");
								record.loanNo = layout.innerForm.getValue("loanNo");
								getNewLayout(record);
								var _values = {};
								_values.applicationFormHeadID = record.subID;
								_values.databaseName = $databaseName;
								isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
									innerListDetail.setData(data);
									hideItemField();
								},{operationId:"SFDA_common_applicationRecordsDetail"});
							},{operationId:"SFDA_applicationFlow_infoSave"});
								
						},
						backAction:function(){
							
						}
					});
					
					if(layout.innerForm.getValue("applicationFormNo")){
						var applicationFormNo = layout.innerForm.getValue("applicationFormNo");
						isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:applicationFormNo},function(deResonse,data){
							var msg = data[0].messageInfo;
							if(msg!="1"){
								isc.say(msg);
								auditWin.window.hide();	
								return;
							}else{
								auditWin.innerLayout.setMembers([auditList]);
								auditWin.window.show();					
							}
						},{operationId:"SFDA_ZQ_applicationCheck"});
					}else{
						auditWin.innerLayout.setMembers([auditList]);
						auditWin.window.show();			
					}
					

				}
			}
		});
		
		hlayout.setMembers([workFlowImage]);
	};
	

	

	
	var innerSaveActionA = function(type){
	    
		var that = layout;
		var form = that.innerForm;
		if(!layout.innerForm.getValue("subject")){
			isc.say("����걨������д����!");return;
		}
		if(layout.innerForm.getValue("subject").length>40){
			isc.say("���������ַ�̫��,�����40������!");return;
		}
		
		if(!form.getValue("departmentName")||!form.getValue("applicantName")||!form.getValue("attachmentQuantities")){
			isc.say("�뽫��ɫ�����ֶ���д����!");return;
		}

		if(innerListDetail.data.length==0){
			isc.say("����д��������");return;
		}
		
		var dataDt = innerListDetail.data;
		
		if(dataDt.length==1&&!dataDt[0].applicationAmount){
			isc.say("��ѵ�����ϸ���ݲ�ȫ,����");return;
		}
		
		for(var i=0;i<dataDt.length;i++){
			
			//innerListDetail.data[i].moneyRegulation = innerListDetail.data[i].applicationAmount;
			if(isProject){
				if(mustProject){
					if(!dataDt[i].projectEstablishmentID){
						isc.say("������Ŀ������д!",function(){
							innerListDetail.startEditing(i, innerListDetail.getFieldNum('projectName'));
						});
						return;
					}
				}
				
				//alertAll(dataDt[i].applicationClassification);
				if(!dataDt[i].clearingForm){
					isc.say("����д֧����ʽ!");
					return;
				}else{
					if(dataDt[i].clearingForm != '����'){
						if(!layout.innerForm.getValue("payMent")){
							isc.say("����д�ǹ���֧��˵��!");
							return;
						}else if(!layout.innerForm.getValue("payAccountNumber")){
							isc.say("����д�Է��˺�!");
							return;
						}
					}
					
				}
				
				
				if(!dataDt[i].applicationClassification||!dataDt[i].applicationAmount){
					//isc.say("������ϸ��"+i+"����·��");
					innerListDetail.removeData(dataDt[i]);
				} 
			}else{
				if(!dataDt[i].applicationClassification||!dataDt[i].applicationAmount){
					// isc.say("������ϸ��"+i+"����·��");
					innerListDetail.removeData(dataDt[i]);
				}				
			}
		}
		
		
		var amountTotal = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
		var relateApAmountT = parseFloat(layout.innerForm.getValue("relateApAmountT"));
		
		// alert(amountTotal);return;
		// if(amountTotal>relateApAmountT){
			// isc.say("�����ܶ�����뵥�ܶ�,����!");return;
		// }
		// if(layout.innerForm.getValue("subject").length>40){
			// isc.say("���������ַ�̫��,�����40������!");return;
		// }
		// alert(type);
		
	var innerSaveB = function(type){
		
		if(!layout.innerForm.getValue("relateApplicationNo")){isc.say("��ѡ��Ԥ�㵥��");return;}
		
			layout.innerForm.setSaveOperationType("add");
			layout.innerForm.setValue("active",1);
			layout.innerForm.setValue("workStation",$hostNameLocal);
			// alertAll(innerListDetail.data);return;
			var dataDt = innerListDetail.data;
			if(dataDt.length==1&&!dataDt[0].applicationAmount){
				isc.say("��ѵ�����ϸ���ݲ�ȫ,����");return;
			}
			for(var i=0;i<dataDt.length;i++){
				innerListDetail.data[i].moneyRegulation = innerListDetail.data[i].applicationAmount;
				if(isProject){
					if( !dataDt[i].applicationClassification && !dataDt[i].applicationAmount ){
						//isc.say("������ϸ��"+i+"����·��");
						innerListDetail.removeData(dataDt[i]);
						
					}

					if(!dataDt[i].applicationClassification){
					
						isc.say("������������д!",function(){
						});
							return;
					}else if(isNaN(dataDt[i].applicationAmount)){
						isc.say("�����������д!",function(){
						});
							return
					}else if(parseFloat(dataDt[i].applicationAmount) == 0 ){				    
						isc.say("�������Ϊ0!",function(){
						});
							return;				
					}
				}else{
					if( !dataDt[i].applicationClassification && !dataDt[i].applicationAmount ){
						//isc.say("������ϸ��"+i+"����·��");
						innerListDetail.removeData(dataDt[i]);
						
					}

					if(!dataDt[i].applicationClassification){
					
						isc.say("������������д!",function(){
						});
							return;
					}else if(isNaN(dataDt[i].applicationAmount)){
						isc.say("�����������д!",function(){
						});
							return
					}else if(parseInt(dataDt[i].applicationAmount) == 0 ){				    
						isc.say("�������Ϊ0!",function(){
						});
							return;				
					}			
				}
			}
			
			var listxml = toXmlForDataFilter(innerListDetail.data,innerListDetail.getAllFields());
			

			var criteria ={};
			criteria.operator = $userName;
			criteria.workStation = $hostNameLocal;
			criteria.databaseName = $databaseName;
			
			criteria.applicationType = layout.innerForm.getValue("applicationType");
			
			// var amountTotalInput = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0].toFixed(2);
			// var budgetTotal = layout.innerForm.getValue("relateApAmountT").toFixed(2);
			// alert(layout.innerForm.getValue("relateApAmountT"));
			var amountTotalInput = parseFloat(innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0].toFixed(2));
			var budgetTotal = parseFloat(layout.innerForm.getValue("relateApAmountT").toFixed(2));
			var surplus = parseFloat(layout.innerForm.getValue("surplus").toFixed(2));			
			
			
			if(!layout.innerForm.getValue("relateApplicationNo")){
				criteria.itemType = "��Ԥ�㱨����";
				layout.innerForm.values.itemType = "��Ԥ�㱨����";
			}else if(amountTotalInput<=surplus){
				criteria.itemType = "��Ԥ�㱨����";
				layout.innerForm.values.itemType = "��Ԥ�㱨����";
			}else if(amountTotalInput>surplus){
				criteria.itemType = "��Ԥ�㱨����";
				layout.innerForm.values.itemType = "��Ԥ�㱨����";
			}
			criteria.actionStyle = "����";
			if(type=="add"){
				var relateApplicationNo = layout.innerForm.getValue("relateApplicationNo");
				var loanNo = layout.innerForm.getValue("loanNo");
				if(!loanNo){
					loanNo = '';
				}else{
					//���½���������
					var totalMoney = 0;
					
					totalMoney = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
					
					var loanTotal = 0;
					for(var i=0;i<innerListDetail.data.length;i++){
						if(innerListDetail.data[i].clearingForm=="�ֽ�"){
							loanTotal = loanTotal + innerListDetail.data[i].applicationAmount
						}
					}
					
					var loanTotalAmount = layout.innerForm.getValue("loanTotalAmount");
					
					var returnedAmount=0,additionalAmount=0;
					var balance = parseFloat(loanTotalAmount) - parseFloat(loanTotal);
					if(!loanTotalAmount){
						balance = 0;
					}
					layout.innerForm.setValue("reimbursementAmount",parseFloat(totalMoney));
					if(balance>0){
						layout.innerForm.setValue("returnedAmount",balance);
						layout.innerForm.setValue("additionalAmount",0);
					}else{
						layout.innerForm.setValue("returnedAmount",0);
						layout.innerForm.setValue("additionalAmount",Math.abs(balance));
					}						
				}
				if(relateApplicationNo){
					isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:relateApplicationNo,loanNo:loanNo},function(deResonse,data){
						var msg = data[0].messageInfo;
						if(msg=='1'){
							isc.DataSource.get("T_applicationTypeDS").fetchData({Name:args,isUse:"True",databaseName:$databaseName},function(dsResponse,data){
								isc.DataSource.get("T_applicationFormHeadDS").fetchData({GZNY:$GZNY,DJT:data[0].tagName,databaseName:$databaseName},function(dsResponse,data){
									var djbh = "";
									if(data.length!=0){
										layout.innerForm.setValue("applicationFormNo",data[0].DJBH);
										djbh = data[0].DJBH;
									}
									layout.innerForm.saveData(function(dsResponse,data,dsRequest){
										var mdata = data;
										var mid = data.applicationFormHeadID;

										criteria.itemID = mid;
										isc.DataSource.get("T_applicationFormHeadDS").updateData({applicationFormHeadID:mid,subID:mid},function(dsResponse,data){
											layout.innerForm.fetchData({applicationFormHeadID:mid});
											isc.DataSource.get("T_paymentApplicationContentDS").fetchData({subID:mid,xml:listxml},function(dsResponse,data){
												var ct = {};
												ct.itemType = layout.innerForm.getValue("applicationType");
												// ct.workStation = $hostNameLocal;
												ct.workStation = $randomWorkStation;
												ct.operator = $userName;
												ct.subID = mid;
												layout.innerForm.setValue("relateApDate",mdata.applicationDate);
												layout.innerForm.setValue("relateApName",mdata.applicantName);
												layout.innerForm.setValue("relateApSubject",mdata.subject);
												layout.innerForm.setValue("subID",mid);
												layout.innerForm.setValue("relateApAmountT",budgetTotal);												
												isc.DataSource.get("T_attachmentInfoUseDS").fetchData(ct,function(dsResponse,data){
													var auditFields = [
														{name:"userName",title:"userName",width:"*",showIf:"false"},
														{name:"auditOpinion",title:"������",width:"*",showIf:"false"},
														{name:"applyStyle",title:"��������",width:"*",showIf:"false"},
														{name:"XH",title:"����",width:80,canEdit:false},
														{name:"auditorType",title:"�������",width:120,canEdit:true,type:"select", editorProperties:{ //showIf:"false",
															optionDataSource:"T_baseInfoDS",//required:true,
															valueField:"name",displayField:"name",
															pickListWidth:200,
															// optionCriteria :{typeNo:"auditType"},
															pickListFields: [
																//{ name:"no",title:"���", width:"*"},
																{ name:"name",title:"�������", width:"*"}
															]
															,
															getPickListFilterCriteria : function () {
																return {typeNo:"auditType"};
															}
														}},
														{name:"auditorClass",title:"���Ȩ��",width:"*",showIf:"false"},
														{name:"auditorOrder",title:"���",width:30,canEdit:false,showIf:"false"},
														{name:"auditorDepartNo",title:"���ű��",width:"*",showIf:"false"},
														{name:"auditorDepartName",title:"�ֹܲ�������",width:200,canEdit:false,showIf:"false"},
														{name:"staffDepartmentNo",showIf:"false"},
														{name:"staffDepartmentName",title:"�ֹܲ�������",width:100,canEdit:false},
														{name:"auditorName",title:"�����Ա",width:100,canEdit:true,type:"select", editorProperties:{ 	
															optionDataSource:"T_applicationFormHeadDS",
															optionOperationId:"SP_CAUTHORITYNAME",
															valueField:"staffName",
															pickListWidth:400,
															pickListFields: [
																{ name:"staffId",title:"��Ա���", width:"*",showIf:"false"},
																{ name:"parentId",title:"��Ա���", width:"*",showIf:"false"},
																{ name:"countId",title:"��Ա���", width:"*",showIf:"false"},
																{ name:"staffNo",title:"��Ա���", width:"*",showIf:"false"},
																{ name:"staffName",title:"��Ա����", width:"*"},
																{ name:"departmentNo",title:"���ű��", width:"*",showIf:"false"},
																{ name:"departmentName",title:"��������", width:"*",showIf:"false"},
																{name:"staffDepartmentNo",showIf:"false"},
																{ name:"staffDepartmentName",title:"��������", width:"*"},
																{ name:"post",title:"ְ��",width:"*"}
															],
															getPickListFilterCriteria: function(){
																var rowNum = auditList.getEditRow();
																var record = auditList.getRecord(rowNum);
																var values = {};
																values.departmentNo = record.auditorDepartNo;
																values.departmentName = record.auditorDepartName;
																values.auditorType = record.auditorType;
																if(!record.auditorDuty){
																	values.job = "";
																}else{
																	values.job = record.auditorDuty;
																}
																if(!record.applyStyle){
																	values.applyStyle = "";
																}else{
																	values.applyStyle = record.applyStyle;
																}
																return values;
															},changed :function(form, item, value){
																var rowNum = auditList.getEditRow();
																// var colNum = auditList.getFieldNum("");
																var values ={},selectedRecord = this.getSelectedRecord();

																values.auditorDepartNo = selectedRecord.departmentNo;
																values.auditorDepartName = selectedRecord.departmentName;
																values.auditorDuty = selectedRecord.post;
																values.auditorName = selectedRecord.staffName;
																values.auditorUserNo = selectedRecord.staffNo;
																values.auditorUserName = selectedRecord.userName;
																values.controlType = "����";
																auditList.setEditValues  (rowNum,values);
															}
														}},
														{name:"controlType",title:"��������",width:100,canEdit:false},
														{name:"auditorUserNo",title:"�����Ա���",width:"*",showIf:"false"},
														{name:"addbtn",title:" ",width:22,showIf:"true",canEdit:false},
														{name:"delbtn",title:" ",width:22,showIf:"true",canEdit:false},
														{name:"auditorUserName",title:"�����ʺ�",width:"*",showIf:"false"}
													];
													

													
													var auditList = isc.M3ListGrid.create({
														width:"100%",height:370,
														fields:auditFields,
														groupStartOpen:"all",
														groupByField: 'XH',
														modalEditing :true,
														initWidget : function () {
															this.Super("initWidget", arguments);
															var it = this;
															// if(type=="add"){
																var values = {};
																
																values.amountTotal = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
																values.operator = $userName;
																values.departmentNo = layout.innerForm.values.departmentNo;
																values.departmentName = layout.innerForm.values.departmentName;
																values.applicationType = layout.innerForm.values.applicationType;
																values.subID = layout.innerForm.values.subID;
																if(!layout.innerForm.getValue("relateApplicationNo")){
																	values.itemType = "��Ԥ�㱨����";
																}else if(amountTotalInput<=surplus){
																	values.itemType = "��Ԥ�㱨����";
																}else if(amountTotalInput>surplus){
																	values.itemType = "��Ԥ�㱨����";
																}
																// sayAll(values);
																isc.DataSource.get("T_applicationFormHeadDS").fetchData(values,function(dsResponse,data){
																	it.setData(data);
																	auditWin.saveBtn.setDisabled(false);
																},{operationId:"sp_ctempleAuditList_New"});
															// }else if(type=="update"){
																
																// isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID:layout.innerForm.getValue("subID")},function(dsResponse,data){
																	// it.setData(data);
																// },{operationId:"SFDA_applicationFlow_auditInfoMSG"});
															// }
															
														},
														showRecordComponents: true,  		
														showRecordComponentsByCell: true,  
														createRecordComponent : function (record, colNum) {  
															var fieldName = this.getFieldName(colNum);  
															var that = this;
															if (fieldName == "addbtn") {  //&&(this.data.length-1)==this.getRecordIndex(record)
																var recordCanvas = isc.HLayout.create({
																	height: 22,	align: "left"
																});
																var editImg = isc.ImgButton.create({
																	showDown: false,showRollOver: false,
																	layoutAlign: "center",
																	src: "Victor/plus.png",
																	prompt: "����һ����¼",
																	height: 16,	width: 16,grid: this,
																	click : function () {
																		var auditorType = record.auditorType,maxId=0;
																		var mdata = that.originalData;
																		// var rowNum = that.getRecordIndex(record);
																		var rowNum = mdata.indexOf(record);
																		
																		var newArr = [];
																		for(var i=0;i<mdata.length;i++){
																			
																			if(rowNum>=i){
																				newArr.add(mdata[i]);
																				if(rowNum==i){
																					var _data = {};
																					_data.auditorOrder = record.auditorOrder+1;
																					_data.auditorClass = "����";
																					_data.auditorDepartNo = record.auditorDepartNo;
																					_data.auditorDepartName = record.auditorDepartName;
																					_data.applyStyle = '';
																					_data.auditorType = record.auditorType;
																					_data.auditorDuty = '';
																					_data.userName = $userName;
																					_data.XH = record.XH;
																					newArr.add(_data);
																				}
																			}else if(rowNum<i){
																				if(mdata[i].auditorType == auditorType){
																					mdata[i].auditorOrder = mdata[i].auditorOrder+1;
																				}
																				newArr.add(mdata[i]);
																			}
																		}
																		
																		that.setData(newArr);
																		// that.startEditing(rowNum+2, that.getFieldNum('auditorName'));
																		that.invalidateCache();
																	}
																});
																recordCanvas.addMember(editImg);  
																return recordCanvas;  
															} 
															else if (fieldName == "delbtn") {  //&&(this.data.length-1)==this.getRecordIndex(record)
																var recordCanvas = isc.HLayout.create({
																	height: 22,	align: "left"
																});

																var editImg = isc.ImgButton.create({
																	showDown: false,showRollOver: false,
																	layoutAlign: "center",
																	src: "Victor/minus.png",
																	prompt: "ɾ����¼",
																	height: 16,	width: 16,grid: this,
																	click : function () {
																		isc.confirm("��ȷ��Ҫɾ����?",function(value){
																			if(value){
																				auditList.removeData (auditList.getRecord (auditList.getRecordIndex(record)));
																			}
																			
																		})
																	}
																});
																if(record.auditorClass=="����"||!record.auditorName){
																	recordCanvas.addMember(editImg);  
																}
																return recordCanvas;  
															}else {  
																return null;  
															}  
														},
														canEditCell : function (rowNum, colNum) {
															var mRecord = this.getRecord(rowNum);
															var fieldName = this.getFieldName(colNum);
															if (fieldName == "auditorName"&&mRecord.auditorClass=="��Ա") {
																return false;   
															}
															return this.Super("canEditCell", arguments);
														}
													});

													var auditWin = isc.M3Windows.create({
														title:"�����Ա�б�",
														saveAction:function(){
															var mdata = auditList.originalData;
															for(var i=0;i<mdata.length;i++){
																if(mdata[i].auditorName==""||!mdata[i].auditorName){
																	isc.say("��������Ա��д����,������������Ѹü�¼ɾ��!");return;
																}
															};
															
															var workFlowFlash = function(){
																var workFlowImage = isc.M3FlowShow.create({
																	getCriteria:function(){
																		return {itemID:-1,itemType:args};
																	},
																	setAction:function(){
																		// alert('1');
																	}
																});
																hlayout.setMembers([workFlowImage]);
															};	

															var auditListXml = toXmlForDataFilter(auditList.originalData,auditList.getAllFields());
															criteria.xml = auditListXml;				
															criteria.isReset = true;
															
															isc.DataSource.get("T_applicationFormHeadDS").fetchData(criteria,function(dsResponse,data){	
																isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormHeadID:djbh,flag:"add"},function(dsResponse,data){		
																	isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormHeadID:mid},function(dsResponse,data){
																		if(data[0].auditorName=="�������"){
																			isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID : mid}, function (dsResponse, data) {
																					var remainder = data[0].records % 5;
																					var pages;
																					if (remainder == 0) {
																						pages = data[0].records / 5;
																					} else {
																						pages = Math.floor(data[0].records / 5) + 1;
																					}
																					isc.confirm("�˷ݱ���������<font color=blue>" + pages + "ҳ</font>��Ҫ��ӡ�����Ƿ���Ҫ��ӡ�����ӡ��������鲻Ҫ��©��", function (value) {
																						if (value) {
																							//var mid = layout.innerForm.getValue("subID");
																							//alert(mid);
																							isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID : mid}, function (dsResponse, data) {
																								var sn = data[0].sn;
																								isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID : mid}, function (dsResponse, data) {
																									var remainder = data[0].records % 5;
																									var pages;
																									if (remainder == 0) {
																										pages = data[0].records / 5;
																									} else {
																										pages = Math.floor(data[0].records / 5) + 1;
																									}
																									for (var i = 1; i < pages + 1; i++) {
																										expenseAccountPdfPrint(sn, mid, i);
																									}
																									innerListDetail.setData([{applicationContent:"",remarks:"",subID:"",projectName:""}]);
																									that.outDelBtn.setDisabled(true);
																									workFlowFlash();	
																									that.innerForm.clearValues();
																									getNewLayout();
																									naviPane.refreshStatus();														
																								}, {operationId : "SP_qf_detailsCount"});
																							}, {operationId : "SP_DATESUBID"});
																						} else {
																							innerListDetail.setData([{applicationContent:"",remarks:"",subID:"",projectName:""}]);
																							that.outDelBtn.setDisabled(true);
																							workFlowFlash();	
																							that.innerForm.clearValues();
																							getNewLayout();
																							naviPane.refreshStatus();
																										// naviPane.refreshStatus();
																							}
																						});
																							
																				}, {operationId : "SP_qf_detailsCount"});
																		}else{
																				layout.innerForm.clearValues();
																				getNewLayout();
																				// isc.say("");														
																		}
																	},{operationId:"SFDA_getAuditorName"});					
																	// layout.innerForm.clearValues();
																	auditWin.window.hide();
																},{operationId:"SFDA_Z_YSSQCP"});
															},{operationId:"SFDA_applicationFlow_infoSave"});				
															
														},
														backAction:function(){
														
														}
													});
													if(!layout.innerForm.getValue("relateApplicationNo")){
														auditWin.window.setTitle("�����Ա�б� �˴α����������Ϊ:<font color=blue>��Ԥ�㱨����</font>");
													}else if(amountTotalInput<=surplus){
														auditWin.window.setTitle("�����Ա�б� �˴α����������Ϊ:<font color=blue>��Ԥ�㱨����</font>");
													}else if(amountTotalInput>surplus){
														auditWin.window.setTitle("�����Ա�б� �˴α����������Ϊ:<font color=blue>��Ԥ�㱨����</font>");
													}
												
													if(layout.innerForm.getValue("applicationFormNo")){
														var applicationFormNo = layout.innerForm.getValue("applicationFormNo");
														isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:applicationFormNo},function(deResonse,data){
															var msg = data[0].messageInfo;
															if(msg!="1"){
																isc.say(msg);
																auditWin.window.hide();
																return;
															}else{
																auditWin.innerLayout.setMembers([auditList]);
																auditWin.window.show();
															}
														},{operationId:"SFDA_ZQ_applicationCheck"});
													}else{
														auditWin.innerLayout.setMembers([auditList]);
														auditWin.window.show();					
													}															
	
												},{operationId:"SFDA_attachment_firstSave"});
												
											},{operationId:"SFDA_reimburse_FormDtSave"})
										});											

									

									});
								},{operationId:"SFDA_D_GetSQDH"});
							});	
						}else{
							isc.say(msg);return;
						}
					},{operationId:"SFDA_ZQ_applicationSaveCheck"});
				}
			}else if(type=="update"){
				var loanNo = layout.innerForm.getValue("loanNo");
				if(!loanNo){
					loanNo = '';
				}else{
					//���½���������
					var totalMoney = 0;
					
					totalMoney = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
					
					var loanTotal = 0;
					for(var i=0;i<innerListDetail.data.length;i++){
						if(innerListDetail.data[i].clearingForm=="�ֽ�"){
							loanTotal = loanTotal + innerListDetail.data[i].applicationAmount
						}
					}
					
					var loanTotalAmount = layout.innerForm.getValue("loanTotalAmount");
					
					var returnedAmount=0,additionalAmount=0;
					var balance = parseFloat(loanTotalAmount) - parseFloat(loanTotal);
					if(!loanTotalAmount){
						balance = 0;
					}
					layout.innerForm.setValue("reimbursementAmount",parseFloat(totalMoney));
					if(balance>0){
						layout.innerForm.setValue("returnedAmount",balance);
						layout.innerForm.setValue("additionalAmount",0);
					}else{
						layout.innerForm.setValue("returnedAmount",0);
						layout.innerForm.setValue("additionalAmount",Math.abs(balance));
					}						
				}					
				var _subID = layout.innerForm.getValue("subID");
				isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID:_subID,active:1},function(dsResponse,data){
					
					if(data[0].isAccounting){isc.say("��������,�����޸�!");return}
					
					else{
						var criteria2 = {};
						criteria2.subID = layout.innerForm.getValue("subID");
						criteria2.moneyAdjust = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
						isc.DataSource.get("T_applicationTypeDS").fetchData(criteria2,function(dsResponse,data){
							criteria.isReset = data[0].isReset;
							
							var myid = layout.innerForm.getValue("applicationFormHeadID");

							isc.DataSource.get("T_applicationFormHeadDS").updateData({applicationFormHeadID:myid,active:0},function(dsResponse,data){});
			
							layout.innerForm.setValue("applicationFormHeadID",-1);
							layout.innerForm.saveData(function(dsResponse,data,dsRequest){
								var djbh = data.applicationFormNo;
								var headData = data;
								criteria.itemID = layout.innerForm.getValue("subID");
								isc.DataSource.get("T_paymentApplicationContentDS").fetchData({subID:layout.innerForm.getValue("subID"),xml:listxml},function(dsResponse,data){
									layout.innerForm.setValue("relateApDate",headData.applicationDate);
									layout.innerForm.setValue("relateApName",headData.applicantName);
									layout.innerForm.setValue("relateApSubject",headData.subject);
									layout.innerForm.setValue("relateApAmountT",budgetTotal);									
									var auditFields = [
										{name:"userName",title:"userName",width:"*",showIf:"false"},
										{name:"auditOpinion",title:"������",width:"*",showIf:"false"},
										{name:"applyStyle",title:"��������",width:"*",showIf:"false"},
										{name:"XH",title:"����",width:80,canEdit:false},
										{name:"auditorType",title:"�������",width:120,canEdit:true,type:"select", editorProperties:{ //showIf:"false",
											optionDataSource:"T_baseInfoDS",//required:true,
											valueField:"name",displayField:"name",
											pickListWidth:200,
											// optionCriteria :{typeNo:"auditType"},
											pickListFields: [
												//{ name:"no",title:"���", width:"*"},
												{ name:"name",title:"�������", width:"*"}
											]
											,
											getPickListFilterCriteria : function () {
												return {typeNo:"auditType"};
											}
										}},
										{name:"auditorClass",title:"���Ȩ��",width:"*",showIf:"false"},
										{name:"auditorOrder",title:"���",width:30,canEdit:false,showIf:"false"},
										{name:"auditorDepartNo",title:"���ű��",width:"*",showIf:"false"},
										{name:"auditorDepartName",title:"�ֹܲ�������",width:200,canEdit:false,showIf:"false"},
										{name:"staffDepartmentNo",showIf:"false"},
										{name:"staffDepartmentName",title:"�ֹܲ�������",width:100,canEdit:false},
										{name:"auditorName",title:"�����Ա",width:100,canEdit:true,type:"select", editorProperties:{ 	
											optionDataSource:"T_applicationFormHeadDS",
											optionOperationId:"SP_CAUTHORITYNAME",
											valueField:"staffName",
											pickListWidth:400,
											pickListFields: [
												{ name:"staffId",title:"��Ա���", width:"*",showIf:"false"},
												{ name:"parentId",title:"��Ա���", width:"*",showIf:"false"},
												{ name:"countId",title:"��Ա���", width:"*",showIf:"false"},
												{ name:"staffNo",title:"��Ա���", width:"*",showIf:"false"},
												{ name:"staffName",title:"��Ա����", width:"*"},
												{ name:"departmentNo",title:"���ű��", width:"*",showIf:"false"},
												{ name:"departmentName",title:"��������", width:"*",showIf:"false"},
												{name:"staffDepartmentNo",showIf:"false"},
												{ name:"staffDepartmentName",title:"��������", width:"*"},
												{ name:"post",title:"ְ��",width:"*"}
											],
											getPickListFilterCriteria: function(){
												var rowNum = auditList.getEditRow();
												var record = auditList.getRecord(rowNum);
												var values = {};
												values.departmentNo = record.auditorDepartNo;
												values.departmentName = record.auditorDepartName;
												values.auditorType = record.auditorType;
												if(!record.auditorDuty){
													values.job = "";
												}else{
													values.job = record.auditorDuty;
												}
												if(!record.applyStyle){
													values.applyStyle = "";
												}else{
													values.applyStyle = record.applyStyle;
												}
												return values;
											},changed :function(form, item, value){
												var rowNum = auditList.getEditRow();
												// var colNum = auditList.getFieldNum("");
												var values ={},selectedRecord = this.getSelectedRecord();

												values.auditorDepartNo = selectedRecord.departmentNo;
												values.auditorDepartName = selectedRecord.departmentName;
												values.auditorDuty = selectedRecord.post;
												values.auditorName = selectedRecord.staffName;
												values.auditorUserNo = selectedRecord.staffNo;
												values.auditorUserName = selectedRecord.userName;
												values.controlType = "����";
												auditList.setEditValues  (rowNum,values);
											}
										}},
										{name:"controlType",title:"��������",width:100,canEdit:false},
										{name:"auditorUserNo",title:"�����Ա���",width:"*",showIf:"false"},
										{name:"addbtn",title:" ",width:22,showIf:"true",canEdit:false},
										{name:"delbtn",title:" ",width:22,showIf:"true",canEdit:false},
										{name:"auditorUserName",title:"�����ʺ�",width:"*",showIf:"false"}
									];
									

									
									var auditList = isc.M3ListGrid.create({
										width:"100%",height:370,
										fields:auditFields,
										groupStartOpen:"all",
										groupByField: 'XH',
										modalEditing :true,
										initWidget : function () {
											this.Super("initWidget", arguments);
											var it = this;
											// if(type=="add"){
												var values = {};
												
												values.amountTotal = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
												values.operator = $userName;
												values.departmentNo = layout.innerForm.values.departmentNo;
												values.departmentName = layout.innerForm.values.departmentName;
												values.applicationType = layout.innerForm.values.applicationType;
												values.subID = layout.innerForm.values.subID;
												if(!layout.innerForm.getValue("relateApplicationNo")){
													values.itemType = "��Ԥ�㱨����";
												}else if(amountTotalInput<=surplus){
													values.itemType = "��Ԥ�㱨����";
												}else if(amountTotalInput>surplus){
													values.itemType = "��Ԥ�㱨����";
												}
												// sayAll(values);
												isc.DataSource.get("T_applicationFormHeadDS").fetchData(values,function(dsResponse,data){
													it.setData(data);
													auditWin.saveBtn.setDisabled(false);
												},{operationId:"sp_ctempleAuditList_New"});
											// }else if(type=="update"){
												
												// isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID:layout.innerForm.getValue("subID")},function(dsResponse,data){
													// it.setData(data);
												// },{operationId:"SFDA_applicationFlow_auditInfoMSG"});
											// }
											
										},
										showRecordComponents: true,  		
										showRecordComponentsByCell: true,  
										createRecordComponent : function (record, colNum) {  
											var fieldName = this.getFieldName(colNum);  
											var that = this;
											if (fieldName == "addbtn") {  //&&(this.data.length-1)==this.getRecordIndex(record)
												var recordCanvas = isc.HLayout.create({
													height: 22,	align: "left"
												});
												var editImg = isc.ImgButton.create({
													showDown: false,showRollOver: false,
													layoutAlign: "center",
													src: "Victor/plus.png",
													prompt: "����һ����¼",
													height: 16,	width: 16,grid: this,
													click : function () {
														var auditorType = record.auditorType,maxId=0;
														var mdata = that.originalData;
														// var rowNum = that.getRecordIndex(record);
														var rowNum = mdata.indexOf(record);
														
														var newArr = [];
														for(var i=0;i<mdata.length;i++){
															
															if(rowNum>=i){
																newArr.add(mdata[i]);
																if(rowNum==i){
																	var _data = {};
																	_data.auditorOrder = record.auditorOrder+1;
																	_data.auditorClass = "����";
																	_data.auditorDepartNo = record.auditorDepartNo;
																	_data.auditorDepartName = record.auditorDepartName;
																	_data.applyStyle = '';
																	_data.auditorType = record.auditorType;
																	_data.auditorDuty = '';
																	_data.userName = $userName;
																	_data.XH = record.XH;
																	newArr.add(_data);
																}
															}else if(rowNum<i){
																if(mdata[i].auditorType == auditorType){
																	mdata[i].auditorOrder = mdata[i].auditorOrder+1;
																}
																newArr.add(mdata[i]);
															}
														}
														
														that.setData(newArr);
														// that.startEditing(rowNum+2, that.getFieldNum('auditorName'));
														that.invalidateCache();
													}
												});
												recordCanvas.addMember(editImg);  
												return recordCanvas;  
											} 
											else if (fieldName == "delbtn") {  //&&(this.data.length-1)==this.getRecordIndex(record)
												var recordCanvas = isc.HLayout.create({
													height: 22,	align: "left"
												});

												var editImg = isc.ImgButton.create({
													showDown: false,showRollOver: false,
													layoutAlign: "center",
													src: "Victor/minus.png",
													prompt: "ɾ����¼",
													height: 16,	width: 16,grid: this,
													click : function () {
														isc.confirm("��ȷ��Ҫɾ����?",function(value){
															if(value){
																auditList.removeData (auditList.getRecord (auditList.getRecordIndex(record)));
															}
															
														})
													}
												});
												if(record.auditorClass=="����"||!record.auditorName){
													recordCanvas.addMember(editImg);  
												}
												return recordCanvas;  
											}else {  
												return null;  
											}  
										},
										canEditCell : function (rowNum, colNum) {
											var mRecord = this.getRecord(rowNum);
											var fieldName = this.getFieldName(colNum);
											if (fieldName == "auditorName"&&mRecord.auditorClass=="��Ա") {
												return false;   
											}
											return this.Super("canEditCell", arguments);
										}
									});

									var auditWin = isc.M3Windows.create({
										title:"�����Ա�б�",
										saveAction:function(){
											var mdata = auditList.originalData;
											for(var i=0;i<mdata.length;i++){
												if(mdata[i].auditorName==""||!mdata[i].auditorName){
													isc.say("��������Ա��д����,������������Ѹü�¼ɾ��!");return;
												}
											};
											
											var workFlowFlash = function(){
												var workFlowImage = isc.M3FlowShow.create({
													getCriteria:function(){
														return {itemID:-1,itemType:args};
													},
													setAction:function(){
														// alert('1');
													}
												});
												hlayout.setMembers([workFlowImage]);
											};	

											var auditListXml = toXmlForDataFilter(auditList.originalData,auditList.getAllFields());
											criteria.xml = auditListXml;				
											criteria.isReset = true;
											
											isc.DataSource.get("T_applicationFormHeadDS").fetchData(criteria,function(dsResponse,data){	
												isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormHeadID:djbh,flag:"add"},function(dsResponse,data){		
													isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormHeadID:_subID},function(dsResponse,data){
														if(data[0].auditorName=="�������"){
															isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID : _subID}, function (dsResponse, data) {
																var remainder = data[0].records % 5;
																var pages;
																if (remainder == 0) {
																	pages = data[0].records / 5;
																} else {
																	pages = Math.floor(data[0].records / 5) + 1;
																}
																isc.confirm("�˷ݱ���������<font color=blue>" + pages + "ҳ</font>��Ҫ��ӡ�����Ƿ���Ҫ��ӡ�����ӡ��������鲻Ҫ��©��", function (value) {
																	if (value) {
																		var mid = layout.innerForm.getValue("subID");
																		isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID : mid}, function (dsResponse, data) {
																			var sn = data[0].sn;
																			isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID : mid}, function (dsResponse, data) {
																				var remainder = data[0].records % 5;
																				var pages;
																				if (remainder == 0) {
																					pages = data[0].records / 5;
																				} else {
																					pages = Math.floor(data[0].records / 5) + 1;
																				}
																				for (var i = 1; i < pages + 1; i++) {
																					expenseAccountPdfPrint(sn, mid, i);
																				}
																				layout.innerForm.clearValues();
																				getNewLayout();
																			}, {operationId : "SP_qf_detailsCount"});
																		}, {operationId : "SP_DATESUBID"});
																	} else {
																		layout.innerForm.clearValues();
																		getNewLayout();
																					// naviPane.refreshStatus();
																		}
																	});
																		
															}, {operationId : "SP_qf_detailsCount"});
														}else{
																layout.innerForm.clearValues();
																getNewLayout();
																// isc.say("");														
														}
													},{operationId:"SFDA_getAuditorName"});					
													// layout.innerForm.clearValues();
													auditWin.window.hide();
												},{operationId:"SFDA_Z_YSSQCP"});
											},{operationId:"SFDA_applicationFlow_infoSave"});				
											
										},
										backAction:function(){
										
										}
									});
									if(!layout.innerForm.getValue("relateApplicationNo")){
										auditWin.window.setTitle("�����Ա�б� �˴α����������Ϊ:<font color=blue>��Ԥ�㱨����</font>");
									}else if(amountTotalInput<=surplus){
										auditWin.window.setTitle("�����Ա�б� �˴α����������Ϊ:<font color=blue>��Ԥ�㱨����</font>");
									}else if(amountTotalInput>surplus){
										auditWin.window.setTitle("�����Ա�б� �˴α����������Ϊ:<font color=blue>��Ԥ�㱨����</font>");
									}
								
									if(layout.innerForm.getValue("applicationFormNo")){
										var applicationFormNo = layout.innerForm.getValue("applicationFormNo");
										isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:applicationFormNo},function(deResonse,data){
											var msg = data[0].messageInfo;
											if(msg!="1"){
												isc.say(msg);
												auditWin.window.hide();
												return;
											}else{
												auditWin.innerLayout.setMembers([auditList]);
												auditWin.window.show();
											}
										},{operationId:"SFDA_ZQ_applicationCheck"});
									}else{
										auditWin.innerLayout.setMembers([auditList]);
										auditWin.window.show();					
									}		

								},{operationId:"SFDA_reimburse_FormDtSave"});								

							});
						},{operationId:"SFDA_auditAdjustConfig"})
					}
				});			
			}
		

		
		

	}		
		
		var innerSaveActionOnly = function(){
			if(!layout.innerForm.getValue("relateApplicationNo")){isc.say("��ѡ��Ԥ�㵥��");return;}
			
			if(layout.innerForm.getValue("applicationFormNo")){
				var applicationFormNo = layout.innerForm.getValue("applicationFormNo");
				isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:applicationFormNo},function(deResonse,data){
					var msg = data[0].messageInfo;
					if(msg!="1"){
						isc.say(msg);
						return;
					}
				},{operationId:"SFDA_ZQ_applicationCheck"});
			}		
			
			var amountTotalInput = parseFloat(innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0].toFixed(2));
			var budgetTotal = parseFloat(layout.innerForm.getValue("relateApAmountT").toFixed(2));
			var surplus = parseFloat(layout.innerForm.getValue("surplus").toFixed(2));
			
			layout.innerForm.setSaveOperationType("add");
			layout.innerForm.setValue("active",1);
			layout.innerForm.setValue("workStation",$hostNameLocal);
			// alertAll(innerListDetail.data);return;
			var dataDt = innerListDetail.data;
			if(dataDt.length==1&&!dataDt[0].applicationAmount){
				isc.say("��ѵ�����ϸ���ݲ�ȫ,����");return;
			}
			for(var i=0;i<dataDt.length;i++){
				innerListDetail.data[i].moneyRegulation = innerListDetail.data[i].applicationAmount;
				if(isProject){
					if( !dataDt[i].applicationClassification && !dataDt[i].applicationAmount ){
						//isc.say("������ϸ��"+i+"����·��");
						innerListDetail.removeData(dataDt[i]);
						
					}

					if(!dataDt[i].applicationClassification){
					
						isc.say("������������д!",function(){
						});
							return;
					}else if(isNaN(dataDt[i].applicationAmount)){
						isc.say("�����������д!",function(){
						});
							return
					}else if(parseFloat(dataDt[i].applicationAmount) == 0 ){				    
						isc.say("�������Ϊ0!",function(){
						});
							return;				
					}
				}else{
					if( !dataDt[i].applicationClassification && !dataDt[i].applicationAmount ){
						//isc.say("������ϸ��"+i+"����·��");
						innerListDetail.removeData(dataDt[i]);
						
					}

					if(!dataDt[i].applicationClassification){
					
						isc.say("������������д!",function(){
						});
							return;
					}else if(isNaN(dataDt[i].applicationAmount)){
						isc.say("�����������д!",function(){
						});
							return
					}else if(parseInt(dataDt[i].applicationAmount) == 0 ){				    
						isc.say("�������Ϊ0!",function(){
						});
							return;				
					}			
				}
			}
			// alert(2);
			var listxml = toXmlForDataFilter(innerListDetail.data,innerListDetail.getAllFields());

			var criteria ={};
			criteria.operator = $userName;
			criteria.workStation = $hostNameLocal;
			criteria.databaseName = $databaseName;
			
			criteria.applicationType = layout.innerForm.getValue("applicationType");
			
			
			if(!layout.innerForm.getValue("relateApplicationNo")){
				criteria.itemType = "��Ԥ�㱨����";
				layout.innerForm.values.itemType = "��Ԥ�㱨����";
			}else if(amountTotalInput<=surplus){
				criteria.itemType = "��Ԥ�㱨����";
				layout.innerForm.values.itemType = "��Ԥ�㱨����";
			}else if(amountTotalInput>surplus){
				criteria.itemType = "��Ԥ�㱨����";
				layout.innerForm.values.itemType = "��Ԥ�㱨����";
			}
			criteria.actionStyle = "����";
			var documentStatus = layout.innerForm.getValue("documentStatus");
			// alert(documentStatus);
				if(documentStatus=="�ݸ�"){
					if(!layout.innerForm.getValue("applicationFormHeadID")){
						var relateApplicationNo = layout.innerForm.getValue("relateApplicationNo");
						var loanNo = layout.innerForm.getValue("loanNo");
						if(!loanNo){
							loanNo = '';
						}else{
							//���½���������
							var totalMoney = 0;
							
							totalMoney = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
							
							var loanTotal = 0;
							for(var i=0;i<innerListDetail.data.length;i++){
								if(innerListDetail.data[i].clearingForm=="�ֽ�"){
									loanTotal = loanTotal + innerListDetail.data[i].applicationAmount
								}
							}
							
							var loanTotalAmount = layout.innerForm.getValue("loanTotalAmount");
							
							var returnedAmount=0,additionalAmount=0;
							var balance = parseFloat(loanTotalAmount) - parseFloat(loanTotal);
							if(!loanTotalAmount){
								balance = 0;
							}
							layout.innerForm.setValue("reimbursementAmount",parseFloat(totalMoney));
							if(balance>0){
								layout.innerForm.setValue("returnedAmount",balance);
								layout.innerForm.setValue("additionalAmount",0);
							}else{
								layout.innerForm.setValue("returnedAmount",0);
								layout.innerForm.setValue("additionalAmount",Math.abs(balance));
							}						
						}
						// alert("loanNo="+loanNo);
						if(relateApplicationNo){
							isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:relateApplicationNo,loanNo:loanNo},function(deResonse,data){
								var msg = data[0].messageInfo;
								if(msg=='1'){
									isc.DataSource.get("T_applicationTypeDS").fetchData({Name:args,isUse:"True",databaseName:$databaseName},function(dsResponse,data){
										isc.DataSource.get("T_applicationFormHeadDS").fetchData({GZNY:$GZNY,DJT:data[0].tagName,databaseName:$databaseName},function(dsResponse,data){
											var djbh = "";
											if(data.length!=0){
												layout.innerForm.setValue("applicationFormNo",data[0].DJBH);
												djbh = data[0].DJBH;
											}
											layout.innerForm.saveData(function(dsResponse,data,dsRequest){
												var mdata = data;
												var mid = data.applicationFormHeadID;
												criteria.itemID = mid;
												criteria.isReset = true;
												isc.DataSource.get("T_applicationFormHeadDS").updateData({applicationFormHeadID:mid,subID:mid},function(dsResponse,data){
												
													isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormHeadID:djbh,flag:"add"},function(dsResponse,data){			
														// layout.innerForm.clearValues();
													},{operationId:"SFDA_Z_YSSQCP"});
													
													isc.DataSource.get("T_paymentApplicationContentDS").fetchData({subID:mid,xml:listxml},function(dsResponse,data){
														var ct = {};
														ct.itemType = layout.innerForm.getValue("applicationType");
														// ct.workStation = $hostNameLocal;
														ct.workStation = $randomWorkStation;
														ct.operator = $userName;
														ct.subID = mid;
														layout.innerForm.setValue("relateApDate",mdata.applicationDate);
														layout.innerForm.setValue("relateApName",mdata.applicantName);
														layout.innerForm.setValue("relateApSubject",mdata.subject);
														layout.innerForm.setValue("subID",mid);
														layout.innerForm.setValue("relateApAmountT",budgetTotal);
														layout.outDelBtn.setDisabled(false);			
															isc.DataSource.get("T_attachmentInfoUseDS").fetchData(ct,function(dsResponse,data){
																isc.say("����ɹ�!");
															},{operationId:"SFDA_attachment_firstSave"});
															
														},{operationId:"SFDA_reimburse_FormDtSave"});												
													
												});
											});
										},{operationId:"SFDA_D_GetSQDH"});
									});	
								}else{
									isc.say(msg);return;
								}
							},{operationId:"SFDA_ZQ_applicationSaveCheck"});
						}
					}else{
						var loanNo = layout.innerForm.getValue("loanNo");
						if(!loanNo){
							loanNo = '';
						}else{
							//���½���������
							var totalMoney = 0;
							
							totalMoney = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
							
							var loanTotal = 0;
							for(var i=0;i<innerListDetail.data.length;i++){
								if(innerListDetail.data[i].clearingForm=="�ֽ�"){
									loanTotal = loanTotal + innerListDetail.data[i].applicationAmount
								}
							}
							
							var loanTotalAmount = layout.innerForm.getValue("loanTotalAmount");
							
							var returnedAmount=0,additionalAmount=0;
							var balance = parseFloat(loanTotalAmount) - parseFloat(loanTotal);
							if(!loanTotalAmount){
								balance = 0;
							}
							layout.innerForm.setValue("reimbursementAmount",parseFloat(totalMoney));
							if(balance>0){
								layout.innerForm.setValue("returnedAmount",balance);
								layout.innerForm.setValue("additionalAmount",0);
							}else{
								layout.innerForm.setValue("returnedAmount",0);
								layout.innerForm.setValue("additionalAmount",Math.abs(balance));
							}						
						}					
						// alert(2)
						var _subID = layout.innerForm.getValue("subID");
						isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID:_subID,active:1},function(dsResponse,data){
							
							if(data[0].isAccounting){isc.say("��������,�����޸�!");return}
							
							else{
								var criteria2 = {};
								criteria2.subID = layout.innerForm.getValue("subID");
								criteria2.moneyAdjust = innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0];
								isc.DataSource.get("T_applicationTypeDS").fetchData(criteria2,function(dsResponse,data){
									criteria.isReset = data[0].isReset;
									
									var myid = layout.innerForm.getValue("applicationFormHeadID");

									isc.DataSource.get("T_applicationFormHeadDS").updateData({applicationFormHeadID:myid,active:0},function(dsResponse,data){});
					
									layout.innerForm.setValue("applicationFormHeadID",-1);
									
									layout.innerForm.saveData(function(dsResponse,data,dsRequest){
										var headData = data;
										criteria.itemID = layout.innerForm.getValue("subID");
										
											isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormHeadID:layout.innerForm.getValue("applicationFormNo"),flag:"update"},function(dsResponse,data){			
												// layout.innerForm.clearValues();
											},{operationId:"SFDA_Z_YSSQCP"});
											isc.DataSource.get("T_paymentApplicationContentDS").fetchData({subID:layout.innerForm.getValue("subID"),xml:listxml},function(dsResponse,data){
												layout.innerForm.setValue("relateApDate",headData.applicationDate);
												layout.innerForm.setValue("relateApName",headData.applicantName);
												layout.innerForm.setValue("relateApSubject",headData.subject);
												layout.innerForm.setValue("relateApAmountT",budgetTotal);
												layout.outDelBtn.setDisabled(false);											
												isc.say("����ɹ�!");
											},{operationId:"SFDA_reimburse_FormDtSave"});
										
									});
								},{operationId:"SFDA_auditAdjustConfig"})
							}
						});			
					}				
				}else{
					isc.say("���ύ�ĵ��ݲ��ܵ�������,�����ύ!")
				}
		}		
		
		var amountTotalInputCheck = parseFloat(innerListDetail.getGridSummary(innerListDetail.getField("applicationAmount"))[0].toFixed(2));
		var surplusCheck = parseFloat(layout.innerForm.getValue("surplus").toFixed(2));
		
		if(amountTotalInputCheck > surplusCheck){
			var valuesCheck = {};
			if(!that.innerForm.getValue("subID")){
				valuesCheck.applicationFormHeadID = -1;
			}else{
				valuesCheck.applicationFormHeadID = that.innerForm.getValue("subID");
			};
			valuesCheck.applicationType = that.innerForm.getValue("applicationType");
			valuesCheck.departmentNo = $departmentNo;
			valuesCheck.xml = toXmlForDataFilter(innerListDetail.data,innerListDetail.getAllFields());	
			
			isc.DataSource.get("T_applicationFormHeadDS").fetchData(valuesCheck,function(dsResponse,data){
				
				if(data[0].messageInfo == 0){
					isc.say("Ԥ�����,����!");
					return;
				}else{
					if(type=="save"){
						innerSaveActionOnly();			
					}else if(type=="submit"){
						if(!that.innerForm.getValue("subID")){
							innerSaveB("add");
						}else{
							var applicationFormNo = layout.innerForm.getValue("applicationFormNo");
							isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:applicationFormNo},function(deResonse,data){
								var msg = data[0].messageInfo;
								if(msg=='1'){
									innerSaveB("update");
								}else{
									isc.say(msg);return;
								}
							},{operationId:"SFDA_ZQ_applicationCheck"});
						}			
					}		
				}
			
			},{operationId:"SCW_budgetAmount_check_CPQ"});
			
		}else{
			
			if(type=="save"){
				innerSaveActionOnly();			
			}else if(type=="submit"){
				if(!that.innerForm.getValue("subID")){
					innerSaveB("add");
				}else{
					var applicationFormNo = layout.innerForm.getValue("applicationFormNo");
					isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:applicationFormNo},function(deResonse,data){
						var msg = data[0].messageInfo;
						if(msg=='1'){
							innerSaveB("update");
						}else{
							isc.say(msg);return;
						}
					},{operationId:"SFDA_ZQ_applicationCheck"});
				}			
			}		
		}

		

	};
	
	var hideItemField = function(){
		isc.DataSource.get("T_applicationTypeDS").fetchData({Name:"һ��֧�"},function(dsResponse,data){
			if(data.length>0){
				if(!data[0].isProject){
					// innerListDetail.hideField("projectName");
				}
			}
		});
		
		// isc.DataSource.get("T_applicationFormHeadDS").fetchData({auditInfoID:auditInfoID,databaseName:$databaseName},function(dsResponse,data){
			// if(!data[0].messageInfo){
				// innerListDetail.hideFields(["itemChange"]);//"projectName",
				
			// }
		// },{operationId:"SFDA_audit_authorityCanEdit"});
	};
	
	var initProject = function(){
		isc.DataSource.get("T_applicationTypeDS").fetchData({databaseName:$databaseName,Name:args},function(dsResponse,data){
			var colNum = innerListDetail.getFieldNum("projectName");
			if(!data[0].isProject){
				innerListDetail.hideFields(["projectName"]);
				innerListDetail.hideFields(["projectDetailName"]);
				isProject = false;
			}else if(!data[0].mustProject){
				innerListDetail.showFields(["projectName"]);
				innerListDetail.showFields(["projectDetailName"]);
				if(colNum>0){
					innerListDetail.getField(colNum).mustProject = false;
				}
				mustProject = false;
			}else if(data[0].mustProject){
				innerListDetail.showFields(["projectName"]);
				innerListDetail.showFields(["projectDetailName"]);
				if(colNum>0){
					innerListDetail.getField(colNum).mustProject = true;
				}
				isProject = true;
				mustProject = false;
			}
		})
	}
	
	var layout = isc.M3ApplicationFlow_SZSCW.create({
		
		// showInnerLabel:true,//̧ͷ�Ƿ���ʾ
		// innerLabelContent:"��������",//̧ͷ����
		mainOptionDS:"T_applicationFormHeadDS",//������List�󶨵�ds
		mainOptionOperationId:"SFDA_common_applicationRecords",//������List�󶨵�operationId
		mainListFields:mainListFields,//������List�󶨵�fileds
		mainListCanHover:true,//������List�Ƿ�hover
		hoverDS:"T_applicationFormDtDS",//������Listhover�󶨵�ds
		hoverFields:hoverFields,//������hover�󶨵�fields
		mainHoverWidth:800,
		// showFilterEditor:true,
		filterData:function(criteria){
			this.filterData(criteria);
		},
		//������hover����ץȡ����
		hoverDataFetch:function(hoveList,record, rowNum, colNum){
			hoveList.fetchData({headSubID: record.subID,active:1},null,{showPrompt: false});
		},
		hoverCellCSS:function(listGrid,record, rowNum, colNum){
			if (listGrid.getFieldName(colNum) == "moneyRegulation") {
				if (record.moneyRegulation != record.applicationAmount) {
					return "font-weight:bold; color:red;";
				} 
			}
		},
		//������list���ݵĲ���
		getMainListCriteria: function(){
			// return {operator:$userName,databaseName:$databaseName,applicationType:args,active:1};
			return {gzny:$GZNY,userName:$userName,databaseName:$databaseName,applicationType:args};
		},
		//������record˫���¼�
		mainListRecordDoubleClick:function(viewer, record, recordNum, field, fieldNum, value, rawValue){
			// alertAll(record);
			mRecord = {};
			innerListDetail.getField(innerListDetail.getFieldNum("projectName")).canEdit=true;
			this.innerForm.fetchData({subID:record.subID,active:1},function(dsResponse,data){
				record.itemID = data[0].subID;
				var _values = {};
				_values.applicationFormHeadID = record.subID;
				_values.databaseName = $databaseName;
				// alert("data[0].relateApplicationNo="+data[0].relateApplicationNo);
				if(data[0].relateApplicationNo){
					isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:data[0].relateApplicationNo,active:1},function(dsResponse,data){
						// alertAll(data[0].subID);
						record.relateApplicationType = data[0].applicationType;
						record.relateSubID = data[0].subID;
						record.applicationNo = layout.innerForm.getValue("relateApplicationNo");
						record.loanNo = layout.innerForm.getValue("loanNo");
						
						record.relateItemType = data[0].itemType;
						// alertAll(record);
						getNewLayout(record);
						layout.innerForm.setValue("relateApDate",data[0].applicationDate);
						layout.innerForm.setValue("relateApName",data[0].applicantName);
						layout.innerForm.setValue("relateApSubject",data[0].subject);
						// layout.innerForm.setValue("relateApAmountT",data[0].amountTotal);
						isc.DataSource.get("T_applicationFormDtDS").fetchData({active:1,headSubID:data[0].subID},function(dsResponse,data){
							// alertAll(data);
							// alert("changeMoneyTotal");
							changeMoneyTotal = 0;
							for(var i=0;i<data.length;i++){
								// alert(data[i].moneyRegulation);
								changeMoneyTotal = changeMoneyTotal+parseFloat(data[i].moneyRegulation);
							}
							layout.innerForm.setValue("relateApAmountT",changeMoneyTotal);
							// alert(changeMoneyTotal);
						})
						
						
						isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
							innerListDetail.setData(data);
							hideItemField();
						},{operationId:"SFDA_common_applicationRecordsDetail"});
					});	
				}else{
					isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
						// alertAll(data);
						record.relateApplicationType = "";
						record.relateSubID = -1;
						record.applicationNo = "";
						record.loanNo = "";
						record.applicationNo = layout.innerForm.getValue("relateApplicationNo");
						record.loanNo = layout.innerForm.getValue("loanNo");
						getNewLayout(record);
						innerListDetail.setData(data);
						hideItemField();
						// alertAll(data);
					},{operationId:"SFDA_common_applicationRecordsDetail"});
				}
				
			});
			
		},
		//������record�����¼�
		mainListRecordClick:function(viewer, record, recordNum, field, fieldNum, value, rawValue){
			
		},
		
		innerToobarHeight:30,
		innerFormOptionDS:"T_applicationFormHeadDS",//innerFormOptionDS
		innerFormFields:innerFormFields,//innerFormFields
		innerFormNumCols:8,//innerFormNumCols
		outNewAction:function(){
			mRecord = {};
			getNewLayout();
			hideItemField();
			this.innerForm.clearValues();
			this.outDelBtn.setDisabled(true);
			innerListDetail.getField(innerListDetail.getFieldNum("projectName")).canEdit=true;
		},
		deleteCheck:function(){
			var applicationFormNo = layout.innerForm.getValue("applicationFormNo");
			if(applicationFormNo){
				isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:applicationFormNo},function(deResonse,data){
					var msg = data[0].messageInfo;

					if(msg=='1'){
						
					}else{
						isc.say(msg);return;
					}
				},{operationId:"SFDA_ZQ_applicationCheck"});
			}
		},
		outDelAction:function(){
			mRecord = {};
			var that = this;
			var applicationFormHeadID;
			var itemType;
			if(!that.mainList.getSelectedRecord()){
				applicationFormHeadID = that.innerForm.getValue("subID");
				itemType = that.innerForm.getValue("itemType");
			}else {
				applicationFormHeadID = that.mainList.getSelectedRecord().subID;
				itemType = that.mainList.getSelectedRecord().itemType;
			}
			
			isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID:applicationFormHeadID,active:1},function(dsResponse,data){
				if(data[0].isAccounting){isc.say("��������,����ɾ��!");return}
				else{
					isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormHeadID:layout.innerForm.getValue("applicationFormNo"),flag:"delete"},function(dsResponse,data){
						},{operationId:"SFDA_Z_YSSQCP"});
					isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormHeadID:applicationFormHeadID,databaseName:$databaseName},function(dsResponse,data){
						innerListDetail.getField(innerListDetail.getFieldNum("projectName")).canEdit=true;
						that.mainList.invalidateCache ();
						isc.DataSource.get("userProfile").fetchData({userName:$userName},function(dsResponse,data){
							// alertAll(data[0].isGLY);
							if(data[0].isGLY==1){
								that.mainList.fetchData({databaseName:$databaseName,applicationType:args,active:1});
							}else{
								that.mainList.fetchData({operator:$userName,databaseName:$databaseName,applicationType:args,active:1});
							}
						},{operationId:"SFDA_ZL_getUserRole"});
						
					},{operationId:"SFDA_common_applicationRecordsDel"});
					that.outDelBtn.setDisabled(true);
				}
			});
			
			isc.DataSource.get("realtimeMessagingDS").fetchData({itemID:applicationFormHeadID, itemType:itemType, applicationType:args, userName:$name},
				function(dsResponse, data){
					naviPane.refreshStatus();
				},{operationId:"SFDA_X_updateMessageReadStatus"}
			);
			
			
		},
		innerNewAction:function(){
			mRecord = {};
			getNewLayout();
			hideItemField();
			this.innerForm.clearValues();
			this.outDelBtn.setDisabled(true);
			innerListDetail.getField(innerListDetail.getFieldNum("projectName")).canEdit=true;
		},
		innerSaveAction:function(){
			innerSaveActionA("save");
			innerListDetail.getField(innerListDetail.getFieldNum("projectName")).canEdit=true;
		},
		innerSubmitAction:function(){
			innerSaveActionA("submit");
		},		
		innerSaveBackAction:function(){
			// isc.DataSource.get("T_applicationFormHeadDS").fetchData({operator:$userName,databaseName:$databaseName,applicationType:"args",active:1});
			// correspondingStandard = "";
			// this.mainList.invalidateCache ();
			// this.mainList.fetchData({operator:$userName,databaseName:$databaseName,applicationType:args,active:1});
			
			// this.mainList.setSort(initialSort);
			
			correspondingStandard = "";
			var that = this;
			var _values={};
			_values.gzny = $GZNY;
			_values.userName = $userName;
			_values.databaseName = $databaseName;
			_values.applicationType = args;
			isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
				that.mainList.setData(data);
				mustProject = true;
			},{operationId:"SFDA_common_applicationRecords"});
		},
		innerHelpAction:function(){
            //window.open("http://172.19.96.80/LCYS0021/help/ZK01.pdf");
			window.open("http://"+window.location.host+"/"+$databaseName+"/help/ZK01.pdf");
		},
		innerPrintAction:function(){
			if(this.innerForm.getValue("applicationFormHeadID")){
				var subID = this.innerForm.getValue("subID");
				isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormHeadID:subID},function(dsResponse,data){
					if(data[0].auditorName=="�������"){
				isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID:subID},function(dsResponse,data){
					var sn = data[0].sn;
					isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID:subID},function(dsResponse,data){
						var remainder=data[0].records%5;
						var pages;
						if(remainder==0){
							pages=data[0].records/5;
						}else{
							pages=Math.floor(data[0].records/5)+1;
						}
						// alert(data[0].records);
						// alert(pages);
						for(var i=1;i<pages+1;i++){
							expenseAccountPdfPrint(sn,subID,i);
						}
						
					},{operationId:"SP_qf_detailsCount"});
				},{operationId:"SP_DATESUBID"});
				}else{
						isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormHeadID:subID},function(dsResponse,data){
							// alertAll(data[0].isAudit);
							if(!data[0].isAudit){
								isc.say("������Ҫͨ����˺���ܴ�ӡ��");
							}else{
								isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID:subID},function(dsResponse,data){
									var sn = data[0].sn;
									isc.DataSource.get("T_applicationFormHeadDS").fetchData({subID:subID},function(dsResponse,data){
										var remainder=data[0].records%5;
										var pages;
										if(remainder==0){
											pages=data[0].records/5;
										}else{
											pages=Math.floor(data[0].records/5)+1;
										}
										// alert(data[0].records);
										// alert(pages);
										for(var i=1;i<pages+1;i++){
											expenseAccountPdfPrint(sn,subID,i);
										}
										
									},{operationId:"SP_qf_detailsCount"});
								},{operationId:"SP_DATESUBID"});							
							}
						},{operationId:"SFDA_getIsAudit"});						
					}
				},{operationId:"SFDA_getAuditorName"});	
			}
		},
		innerTubiaoAction:function(){
		    //window.open("http://localhost:8080/help/YS01wd.pdf");
           window.open("http://"+window.location.host+"/"+$databaseName+"/help/YS01wd.pdf");
		}
		
	});
	
	// layout.innerDetailLayout.setMembers([innerListDetail]);
	layout.mainList.setSort(initialSort);
	// alertAll();

	// layout.mainList.setFilterEditorCriteria({operator:$userName,databaseName:$databaseName,applicationType:args,active:1});
	
	layout.mainList.filterData({operator:$userName,databaseName:$databaseName,applicationType:args,active:1});
	
	var hlayout = isc.HLayout.create({
		width:"100%",height:30,left:100,
		defaultLayoutAlign: "center",align :"center",
		members:[]
	});
	
	if(invokeRecord){
        if(invokeRecord=='menuPane'){
			layout.setInnerLayout();
			getNewLayout();
			innerListDetail.invalidateCache();
			layout.innerForm.clearValues();
		}else{

	
			isc.DataSource.get("T_applicationFormHeadDS").fetchData({active:1,applicationFormNo:invokeRecord},function(deResponse,data){
				// alertAll(data);
				if(data.length==0)return;
				var record = {};
				mRecord = {};
				innerListDetail.getField(innerListDetail.getFieldNum("projectName")).canEdit=true;
				layout.innerForm.fetchData({subID:data[0].subID,active:1},function(dsResponse,data){
					
					record.itemID = data[0].subID;
					var superData = data;
					var _values = {};
					_values.applicationFormHeadID = data[0].subID;
					_values.databaseName = $databaseName;
					
					if(data[0].relateApplicationNo){
						
						isc.DataSource.get("T_applicationFormHeadDS").fetchData({applicationFormNo:data[0].relateApplicationNo,active:1},function(dsResponse,data){
							// alertAll(data);
							record.relateApplicationType = data[0].applicationType;
							record.relateSubID = data[0].subID;
							record.applicationNo = superData[0].relateApplicationNo;
							record.loanNo = superData[0].loanNo;
							// alertAll(record);
							record.relateItemType = data[0].itemType;
							record.applicationType = superData[0].applicationType;
							record.itemType = superData[0].itemType;
							record.itemID = superData[0].subID;
							record.subID = superData[0].subID;
							record.relateApplicationNo = superData[0].relateApplicationNo;
							// alertAll(superData);
							// alertAll(record);
							getNewLayout(record);
							layout.innerForm.setValue("relateApDate",data[0].applicationDate);
							layout.innerForm.setValue("relateApName",data[0].applicantName);
							layout.innerForm.setValue("relateApSubject",data[0].subject);
							// layout.innerForm.setValue("relateApAmountT",data[0].amountTotal);
							isc.DataSource.get("T_applicationFormDtDS").fetchData({active:1,headSubID:data[0].subID},function(dsResponse,data){
								// alertAll(data);
								var changeMoneyTotal = 0;
								for(var i=0;i<data.length;i++){
									changeMoneyTotal = changeMoneyTotal+parseFloat(data[i].moneyRegulation);
								}
								layout.innerForm.setValue("relateApAmountT",changeMoneyTotal);
								// alert(changeMoneyTotal);
							})
							
							
							isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
								innerListDetail.setData(data);
								hideItemField();
								layout.setInnerLayout();
								layout.outDelBtn.setDisabled(false);
							},{operationId:"SFDA_common_applicationRecordsDetail"});
						});	
					}else{
						isc.DataSource.get("T_applicationFormHeadDS").fetchData(_values,function(dsResponse,data){
							// alertAll(data);
							record.relateApplicationType = "";
							record.relateSubID = -1;
							record.applicationNo = "";
							record.loanNo = "";
							record.applicationNo = layout.innerForm.getValue("relateApplicationNo");
							record.loanNo = layout.innerForm.getValue("loanNo");
							
							record.applicationType = superData[0].applicationType;
							record.itemType = superData[0].itemType;
							record.itemID = superData[0].subID;
							record.subID = superData[0].subID;
							getNewLayout(record);
							innerListDetail.setData(data);
							hideItemField();
							// alertAll(data);
							layout.setInnerLayout();
							layout.outDelBtn.setDisabled(false);
						},{operationId:"SFDA_common_applicationRecordsDetail"});
					}
					
				});
			});
		}
	}
	
	this.layout = layout;
};