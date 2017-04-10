function limitWordsInput(args) {
	var ele1 = args.ele1;
	var ele2 = args.ele2;
	var limits = args.limits;
	var fn = args.fn;
	ele1.on("input propertychange", function(){
		var currentVal = ele1.val();
		if( currentVal.length > limits){
			var targetVal = currentVal.substr(0 , limits);
			ele1.val(targetVal);
			fn();
		} else {
			ele2.text( 0 + currentVal.length)
		}
	})
}