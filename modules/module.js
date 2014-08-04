/*
*一个简单的模块定义系统
*学习地址：http://www.ituring.com.cn/article/48461
*@auther:民工精髓
*/

(function () {
	var moduleMap = {},
		fileMap = {},
		noop = function () {
			
		};

	var thin = {

		define : function ( name, dependencies, factory ) {
			if (!moduleMap[name]) {
				var module = {
					name : name,
					dependencies : dependencies,
					factory : factory
				};
				moduleMap[module] = module;

				return moduleMap[module];
			}
		},

		use : function (name) {
			var module = moduleMap[name];

			if (!module.entity) {
				var args = [];
				for (var i = 0, len < module.dependencies.length; i <len; i++) {
					if (moduleMap[module.dependencies[i]].entity) {
						args.push(moduleMap[module.dependencies[i]].entity);
					}else{
						args.push(this.use(module.dependencies[i]));
					}
				}
				module.entity = module.factory.call( nopp, args);
			}

			return module.entity;
		},

		require : function ( pathArr, callback ) {
			for (var i = 0, len = pathArr.length; i < len; i++) {
				var path = pathArr[i];

				if ( !fileMap[path] ) {
					var head = document.getElementsByTagName('head')[0],
						node = document.createElement('script');

					node.type = 'text/javascript';
					node.async = 'true';
					node.src = path + '.js';

					node.onload = function () {
						fileMap[path] = true;
						head.removeChild(node);
						checkAllFiles();
					};

					head.appendChild(node);
				}
			}


			function checkAllFiles () {
				var allLoaded = true;
				for (var i = 0, len = pathArr.length; i < len; i++) {
					if (!fileMap[pathArr[i]]) {
						allLoaded = false;
						break;
					}
				}

				if (allLoaded) {
					callback();
				}
			}
		}
	};

	window.thin = thin;
})(window);