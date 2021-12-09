<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<style>
		@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
        

        * {
            box-sizing: border-box;
        }

        html {
            font-size: 16px;
            background-color: #fffffe;
        }
        body {
            padding: 0 20px;
            min-width: 300px;
            font-family: Georgia, 'Times New Roman', Times, serif;
            background-color: #fffffe;
            color: red;
            text-align: center;
            word-wrap: break-word;
            -webkit-font-smoothing: antialiased
        }
        .main-content {
            margin: 0 auto;
            padding-top: 50px;
            max-width: 820px;
        }
        .main-content__checkmark {
            font-size: 4.0625rem;
            line-height: 1;
        }
        .main-content__body {
            margin: 20px 0 0;
            font-size: 1rem;
            line-height: 1.4;
        }

        @media only screen and (min-width: 40em) {

            .main-content__checkmark {
                font-size: 9.75rem;
            }
            .main-content__body {
                font-size: 1.25rem;
            }

        }
	</style>
</head>
<body>


	<div class="main-content">
		<i class="fa fa-warning main-content__checkmark" id="checkmark"></i>
		<p class="main-content__body" data-lead-id="main-content-body">{{$message}}</p>
	</div>
</body>
</html>