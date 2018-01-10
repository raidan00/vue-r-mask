export default {
	get: function (ctrl) {
		var CaretPos = 0;

		if (ctrl.selectionStart || ctrl.selectionStart == 0) {// Standard.
			CaretPos = ctrl.selectionStart;
		} else if (document.selection) {// Legacy IE
			ctrl.focus ();
			var Sel = document.selection.createRange ();
			Sel.moveStart ('character', -ctrl.value.length);
			CaretPos = Sel.text.length;
		} 
		return (CaretPos);
	},
	set: function (ctrl,pos) {
		if (ctrl.setSelectionRange) {
			ctrl.focus();
			ctrl.setSelectionRange(pos,pos);
		}
		else if (ctrl.createTextRange) {
			var range = ctrl.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
}


