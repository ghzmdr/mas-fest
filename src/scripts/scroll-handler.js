import $ from 'jquery'
import debounce from '@f/debounce'

export default class ScrollHandler {
	constructor() {
		this.beacons = $('[data-route]')
		this.firstScroll = true
		$(window).on('scroll', debounce(this.onScroll.bind(this), 400))
	}

	onScroll(e) {
		if (window.isFakeScroll) {
			return
		}

		const bodyTop = $('body').scrollTop()
		let target = null

		this.beacons.each((i, el) => {
			const top = $(el).offset().top
			const bottom = $(el).offset().top + $(el).height()

			if (top <= bodyTop) {
				target = el
			}
		})

		if (target) {
			$(window).trigger('MAS:replace-state', { pathname: target.dataset['route'] })
		}
	}
}
