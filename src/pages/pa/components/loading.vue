<template>
    <div class="main">
      <div class="buddha">
      <div class="head"></div>
      <div class="eyes"></div>
      <div class="mouth"></div>
      <div class="body"></div>
      <div class="legs"></div>
      <div class="shadow"></div>
    </div>
    <div class='des'>载入中...</div>
  </div>
</template>
<script>

</script>
<style scoped>
  .main{
      position: fixed;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
			display: flex;
			justify-content: center;
			align-items: center;
      flex-direction: column;
			background: linear-gradient(white, bisque);
      z-index: 1000;
		}
		.buddha{
			width: 13em;
			height: 19em;
			font-size: 20px;
			display: flex;
			align-items: center;
			flex-direction: column;
			position: relative;
		}
		.head{
			width: 12.5em;
			height: 12.5em;
			color: peachpuff;
			background-color: currentColor;
			border-radius: 50%;
			filter: brightness(0.9);
		}
		.eyes::before,
		.eyes::after {
			content: '';
			position: absolute;
			width: 1em;
			height: 0.5em;
			border:0.6em solid #333;
			border-radius: 1em 1em 0 0;
			border-bottom: none;
			top: 6em;
		}
		.eyes::before {
			left: 2.5em;
		}
		.eyes::after {
			right: 2.5em
		}
		.mouth {
			position: absolute;
			width: 1.5em;
			height: 0.5em;
			border:0.5em solid tomato;
			border-radius: 0 0 1.5em 1.5em;
			border-top: none;
			top: 9em;
		}
		.body {
			position: absolute;
			width: 10em;
			height: 8em;
			background-color: coral;
			border-radius: 4em;
			bottom: 1em;
			z-index: -1;
		}
		.legs {
			position: absolute;
			width: inherit;
			height: 5em;
			background-color: coral;
			border-radius: 2.5em;
			bottom: 0;
			z-index: -1;
		}
		.head {
			box-shadow:
				5.8em 2em 0 -4.8em,
				-5.8em 2em 0 -4.8em,
				0 8.6em 0 -4.5em;
		}
		.head {
			background:
				radial-gradient(
					circle at 50% 40%,
					tomato 0.6em,
					transparent 0.6em
					),
				currentColor,
		}
		.shadow {
			position: absolute;
			width: inherit;
			height: 5em;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 50%;
			bottom: -4em;
			transform: rotateX(100deg);
		}
		.buddha{
			animation: animate 3s ease-in-out infinite;
		}
		@keyframes animate {
			50% {
				transform: translateY(-2em);
			}
		}
		.shadow {
			animation: shadow-animation 3s ease-in-out infinite
		}
		@keyframes shadow-animation {
			50% {
				transform: rotateX(100deg) translateY(-10em) scale(0.7);
			}
		}
    .des{
      margin-top: 100rpx;
      color: rgb(68, 69, 70);
      font-size: 30rpx;
      font-weight: bold;
      letter-spacing: 20rpx;
    }

</style>
