document.addEventListener("DOMContentLoaded", function() {
	gsap.registerPlugin(ScrollTrigger);

	const RANGE = 27

	const resultList = document.querySelector('.accelerators-result__list')
	const resultListItems = gsap.utils.toArray('.accelerators-result__item')
	const resultEmpty = document.querySelector('.accelerators-result__empty')
	
	let revIndex = resultListItems.length - 1

	let resultItemHeight = window.getComputedStyle(resultListItems[0]).height
	resultItemHeight = Number(resultItemHeight.substring(0, resultItemHeight.length - 2))

	const heightEmptyEl = resultItemHeight + ((RANGE + (2 + resultListItems.length)) * resultListItems.length)

	resultEmpty.style.height = `${heightEmptyEl}px`

	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: resultList,
			scrub: true,
			pin: true,
			pinSpacing: false,
			start: 'top top+=100',
			end: "bottom top+=100",
			markers: false,
		},
	  });

	  resultListItems.forEach((item, index) => {
			tl.set(item, {
				filter: 'brightness(1)',
			})
	  })

	  resultListItems.forEach((item, index) => {
		const scale = (1 - (revIndex/10)) > 1 ? 1 : 1 - (revIndex/10)
		let dur = '-=0.0'

		if(index > 1) {
			dur = '-=0.35'
		}
		
		if(index == 0) {
			tl.to(item, {
				scale,
				filter: `brightness(1.${revIndex + 1})`,
			})
		}

		if(index > 0) {
			tl.to(item, {
				y: ((resultItemHeight * index) - (RANGE * index)) * -1,
			}, dur)

			tl.to(item, {
				scale,
				filter: (index !== resultListItems.length - 1) ? `brightness(1.${revIndex + 1})` : 'none'
			}, dur)
		} 
	
		revIndex -= 1
	})

	const questionsListItems = gsap.utils.toArray('.tabs__item').slice(4)
	const questionsListEmail = document.querySelector('.accelerators-questions__mail')
	questionsListItems.push(questionsListEmail)

	const questionsTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.accelerators-questions__list',
			scrub: 1,
			start: () => {
				const startHeight = (questionsListItems[0].getBoundingClientRect() * 4) + 100

				return `top+=${startHeight} bottom+=50px`
			},
			end: 'bottom+=50px bottom-=50px',
			markers: false
		},
	})

	questionsListItems.forEach(item => {
		questionsTl.from(item, {
			opacity: 0,
			scale: 0.6,
		}, "-=0.4")
	})
})
