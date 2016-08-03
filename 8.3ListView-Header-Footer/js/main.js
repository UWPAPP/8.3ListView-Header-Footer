// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var isFirstActivation = true;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.voiceCommand) {
			// TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
			// this is a good place to decide whether to populate an input field or choose a different initial view.
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// A Launch activation happens when the user launches your app via the tile
			// or invokes a toast notification by clicking or tapping on the body.
			if (args.detail.arguments) {
				// TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
				// to take the user in response to them invoking a toast notification.
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: This application had been suspended and was then terminated to reclaim memory.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
				// Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
			// In that case it would be suspended shortly thereafter.
			// Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
			// should be done here (to avoid doing them in the prelaunch case).
			// Alternatively, this work can be done in a resume or visibilitychanged handler.
		}

		if (isFirstActivation) {
			// TODO: The app was activated and had not been running. Do general startup initialization here.
			document.addEventListener("visibilitychange", onVisibilityChanged);
			args.setPromise(WinJS.UI.processAll());
		}

		isFirstActivation = false;
	};

    //注意点：WinJS.Binding.processAll 不能写在onactived中写，因为onactived时候wincontrol还没有被创建
	app.onready = function(agrs){
	    // Cache HTML elements
	    Sample.listView = document.querySelector(".listView");
	    Sample.header = document.querySelector(".header");
	    Sample.footer = document.querySelector(".footer");

	    // Data bind both header and footer elements
	    WinJS.Binding.processAll(Sample.header, Sample).then(function () {
	        return WinJS.Binding.processAll(Sample.footer, Sample);
	    });
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: The app just became visible. This may be a good time to refresh the view.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	app.start();



    //注意点:html绑定的数据对应的Namespace的声明需要在最外面，因为执行顺序的关系，需要保证Namespace中的东西能够被页面找到
	var itemArray = [
          { title: "Marvelous Mint", text: "Gelato", picture: "/images/fruits/60Mint.png" },
          { title: "Succulent Strawberry", text: "Sorbet", picture: "/images/fruits/60Strawberry.png" },
          { title: "Banana Blast", text: "Low-fat frozen yogurt", picture: "/images/fruits/60Banana.png" },
          { title: "Lavish Lemon Ice", text: "Sorbet", picture: "/images/fruits/60Lemon.png" },
          { title: "Creamy Orange", text: "Sorbet", picture: "/images/fruits/60Orange.png" },
          { title: "Very Vanilla", text: "Ice Cream", picture: "/images/fruits/60Vanilla.png" },
          { title: "Banana Blast", text: "Low-fat frozen yogurt", picture: "/images/fruits/60Banana.png" },
          { title: "Lavish Lemon Ice", text: "Sorbet", picture: "/images/fruits/60Lemon.png" }
	];

	var items = [];
    // Generate 16 items
	for (var i = 0; i < 2; i++) {
	    itemArray.forEach(function (item) {
	        items.push(item);
	    });
	}

	WinJS.Namespace.define("Sample", {
	    data: new WinJS.Binding.List(items),
	    eh: {
	        toggleStripes: WinJS.UI.eventHandler(function (ev) {
	            WinJS.Utilities.toggleClass(Sample.listView, "stripes");
	        }),
            //更改header的高度
	        resizeHeader: WinJS.UI.eventHandler(function (ev) {
	            // Calculate a random height for the header element
	            // between 172px and 372px
	            var height = Math.floor((Math.random() * 200) + 172);
	            Sample.header.style.height = height + "px";
	            // 重新计算item的位置
	            Sample.listView.winControl.recalculateItemPosition();
	        }),
            //移除第一条元素
	        removeFirstItem: WinJS.UI.eventHandler(function (ev) {
	            Sample.data.splice(0, 1);
	        }),
            //回到顶部
	        backToTop: WinJS.UI.eventHandler(function (ev) {
	            Sample.listView.winControl.scrollPosition = 0;
	        })
	    },
	    listView: {},
	    header: {},
	    footer: {}
	});
})();
