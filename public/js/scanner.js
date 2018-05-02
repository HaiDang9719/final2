var isScanning=false;
function startScanner(){
	Quagga.init({
		inputStream : {
			name : "Live",
			type : "LiveStream",
			target: document.querySelector('#scanner-container'),
			constraints:{
				width:800,
				height: 500,
				facingMode: "environment"
			},
		},
		decoder : {
			readers : [
				"code_128_reader",
				"ean_reader",
				"ean_8_reader",
				"code_39_reader",
				"code_39_vin_reader",
				"codabar_reader",
				"upc_reader",
				"upc_e_reader",
				"i2of5_reader"
			],
			debug: {
				showCanvas: true,
				showPatches: true,
				showFoundPatches: true,
				showSkeleton: true,
				showLabels: true,
				showPatchLabels: true,
				showRemainingPatchLabels: true,
				boxFromPatches: {
					showTransformed: true,
					showTransformedBox: true,
					showBB: true
				}
			}
		},
		
	}, function(err){
		if(err){
			console.log(err);
			return
		}		
		Quagga.start();		
		isScanning=true;
	});
	
	Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
		drawingCanvas = Quagga.canvas.dom.overlay;
		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
				});
			}
			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
			}
			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
			}
		}
	});
	Quagga.onDetected(function (result) {
		document.getElementById("item_id").value=result.codeResult.code;

		console.log(result.codeResult.code);
		if(document.getElementById("item_id").value=="0097855123176"){			
			matchProduct();
		}
	});
}
// Start/stop scanner
document.getElementById("scan_btn").addEventListener("click", function () {
	if (isScanning) {
		Quagga.stop();
	} else {
		startScanner();
		$("#camModal").modal("toggle");
	}
}, false);
