export default {
	get: function (input) {
		var CaretPos = 0;
		if (input.selectionStart || input.selectionStart == 0) {// Standart.
			CaretPos = input.selectionStart;
		} else if (document.selection) {// Legacy IE
			var Sel = document.selection.createRange ();
			Sel.moveStart ('character', -input.value.length);
			CaretPos = Sel.text.length;
		} 
		return (CaretPos);
	},
	set: function (input, pos) {
		if (input.setSelectionRange) {
			input.setSelectionRange(pos, pos);
		}
		else if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
}


