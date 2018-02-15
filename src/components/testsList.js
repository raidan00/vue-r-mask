export default [

	{ setMask: /\d{2}/ },
	{ before: "__1|", after: "__|"},
	{ before: "1|__", after: "1|_"},
	{ before: ":8080|", after: "80|"},
	{ before: "|_", after: "|__"},
	{ before: "1a|2", after: "1|2"},

	{ setMask:  /\d{2}-\d{2}/ },
	{ before: "12|34", after: "12|-34"},
	{ before: "121|-34", after: "12-1|3"},
	{ before: "1a|2-13", after: "1|2-13"},
	{ before: "__|__", after: "__|-__"},
	{ before: "|", after: "|__-__"},
	{ before: "aaaaaaaaaaa|", after: "|__-__"},
	{ before: "_1|_-__", after: "_1|-__"},

	{ setMask:  /\d{2}\/\d{2}\/\d{2,4}/ },
	{ before: "__/__/__1|", after: "__/__/__1|"},
	{ before: "123456789|", after: "12/34/5678|"},
	{ before: "12/34/567|", after: "12/34/567|"},
	{ before: "12/34/56|", after: "12/34/56|"},
	{ before: "12/34/5|", after: "12/34/5|_"},

	{ setMask:  /\+1 \(\d{3}\) \d{4}-\d{2}/ },
	{ before: "123456789|", after: "+1 (234) 5678-9|_"},
	{ before: "123456789123|", after: "+1 (234) 5678-91|"},
	{ before: "+1 (234) 5678|91", after: "+1 (234) 5678|-91"},
	{ before: "+11| (234) 5678-91", after: "+1 (1|23) 4567-89"},
	{ before: "+1 (123) 45672|-89", after: "+1 (123) 4567-2|8"},
	{ before: "|1 (123) 4567-28", after: "|+1 (123) 4567-28"},
	{ before: "+1 (123|4567-28", after: "+1 (123|) 4567-28"},
	{ before: "123456789012|", after: "+1 (234) 5678-90|"},
]

