/*
模块化编程
 */
var myToDoModule = (function(){
	/*
	变量
	 */
	var task_list = [];
	var $task_list,$content,$addTaskSubmit,$task_detail,$detail_submit,$delete,$task_content,$datetime,$desc;
	var detailIndex,deleteIndex;

	/*
	初始化jQuery对象
	 */
	var initJqVar = function(){
		$task_list = $('.task-list');
		$content = $('.content');
		$addTaskSubmit = $('.addTaskSubmit');
		$task_detail = $('.task-detail');
		$task_content = $('.detail-content');
		$desc = $('.desc');
		$datetime = $('.datetime');
		$detail_submit = $('.detail-submit');
		$delete = $('.delete');
	}

	/*
	页面初始化从store中取出item并渲染
	 */
	var initRenderIndex = function(){
		$task_list.html('');
		task_list = store.get('task_list');
		// if (task-list == null) {
		// 	task-list = [];
		// }
		var taskHtmlStr = '';
		for(var i = task_list.length-1;i>=0;i--){
			var oneItem = '<div class="task-item">'+'<span ><!--复选框-->'+'<input type="checkbox" class="checkbox" />'+'</span>'+'<span class="item-content">'+task_list[i].content+'</span>'+'<span class="fr"><!--item右侧的action-->'+'<span class="action detail"><!--详情-->'+'详情'+	'</span>'+'<span class="action delete"><!--删除-->'+'删除'+	'</span>'+'</span>'+'</div>';
			taskHtmlStr = taskHtmlStr + oneItem;
		}
		$(taskHtmlStr).appendTo($task_list);
		listenDetail();
		listenDelete();
	}

	/*
	添加操作
	 */
	var addTask = function(){
		var new_task ={};
		new_task.content = $content.val();
		task_list.push(new_task);
		store.set('task_list',task_list);
		renderOneItem(new_task);
	}

	/*
	向HTML列表中新添加一条记录
	 */
	var renderOneItem = function(new_task){
		var oneItem = '<div class="task-item">'+'<span ><!--复选框-->'+'<input type="checkbox" class="checkbox" />'+'</span>'+'<span class="item-content">'+new_task.content+'</span>'+'<span class="fr"><!--item右侧的action-->'+'<span class="action detail"><!--详情-->'+'详情'+	'</span>'+'<span class="action delete"><!--删除-->'+'删除'+	'</span>'+'</span>'+'</div>';
		$(oneItem).prependTo($task_list);
		$content.val('');
		listenDetail();
		listenDelete();
	}

	/*
	添加按钮监听事件
	 */
	var listenAddTaskItem = function(){
		$addTaskSubmit.click(function(){
			addTask();
		});
	}

	/*
	点击任务Item的详情，编辑项目明细，并保存。
	 */
	var listenDetail = function(){
		$('.detail').click(function(){
			detailIndex = task_list.length - 1 - $(this).parent().parent().index();
			$task_detail.show();
			if (task_list == null) {
				task_list = [];
			}
			$task_content.val(task_list[detailIndex].content);
			$desc.val(task_list[detailIndex].desc);
			$datetime.val(task_list[detailIndex].datetime);
		});
	}

	var listenDetailSave = function(){
		$detail_submit.click(function(){
			var dataTask = {};
			dataTask.content = $task_content.val();
			dataTask.desc = $desc.val();
			dataTask.datetime = $datetime.val();
			//修改更新操作
			task_list[detailIndex] = $.extend(task_list[detailIndex],dataTask);
			store.set('task_list',task_list);
			$task_content.val('');
			$desc.val('');
			$datetime.val('');
			$task_detail.hide();
			initRenderIndex();
		});
	}

	/*
	删除操作
	 */
	 var listenDelete = function(){
	 	$('.delete').click(function(){
	 		deleteIndex = task_list.length - 1 - $(this).parent().parent().index();
	 		var r = confirm('小主确定删除嘛O(∩_∩)O？');
	 		if (r) {
	 			task_list.splice(deleteIndex,1);//第一个参数是要删除的索引，第二个是个数
	 			$(this).parent().parent().remove();
	 		}
	 		store.set('task_list',task_list);
	 		r.stopImmediatePropagation();
	 	});
	 	
	 }

	/*
	页面初始化要执行的方法
	 */
	var initModule = function(){
		// store.set('task_list',task_list);
		initJqVar();
		$datetime.datetimepicker();
		initRenderIndex();
		listenAddTaskItem();
		listenDetail();
		listenDetailSave();
		listenDelete();
	}
	return{
		initModule:initModule
	}
})();

$(function(){
	myToDoModule.initModule();
});