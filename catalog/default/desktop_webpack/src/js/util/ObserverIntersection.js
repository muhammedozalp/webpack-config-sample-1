/* eslint-disable max-len */
/* eslint-disable no-undef */
class ObserverIntersection {
    constructor() {
        this.sentinelObserver = '';
        this.sentinelTargetList = [];
        this.isNavigating = false;
        this.sentinelListener = this.sentinelListener.bind(this);
        this.navToElViaObs = this.navToElViaObs.bind(this);
    }

    removeSentinel(isNav, targetEl, el) {
        if (!isNav) {
            this.sentinelObserver.unobserve(targetEl);
            targetEl.classList.remove('js-obs');
        } else {
            this.sentinelObserver.unobserve(el);
            el.classList.remove('js-obs');
            el.classList.add('js-nav');
        }
    }

    sentinelUnset(targetEl, isNav) {
        return new Promise((resolve) => {
            if (!targetEl) return;

            if (isNav) {
                this.sentinelTargetList.forEach((el) => {
                    this.removeSentinel(isNav, targetEl, el);
                });
            } else {
                this.removeSentinel(isNav, targetEl);
                this.sentinelTargetList = this.sentinelTargetList.filter((item) => item !== targetEl);
            }

            resolve('done');
        });
    }

    sentinelSet(el) {
        this.sentinelObserver.observe(el);
    }

    sentinelListener(cb, entries) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                if (entry.target.classList.contains('js-obs-ever')) {
                    cb(entry.target, entry.isIntersecting);
                }
                return;
            }

            if (!this.isNavigating) {
                cb(entry.target, entry.isIntersecting);
                if (entry.target.classList.contains('js-obs-ever')) return;

                this.sentinelUnset(entry.target, this.isNavigating);
            }
        });
    }

    initObserver(observingEls, cb) {
        const sentinelConfig = {
            // root default null = viewport ,
            // or if you want, you can observe a scrollable element instead of the whole screen
            root: null,
            rootMargin: '0px', // px or percentage
            threshold: 0
        };

        this.sentinelObserver = new IntersectionObserver(this.sentinelListener.bind(null, cb), sentinelConfig);

        Array.prototype.slice.call(observingEls).forEach((el) => {
            this.sentinelSet(el);
            this.sentinelTargetList.push(el);
        });
    }

    stopObserving(targetEl) {
        return new Promise((resolve) => {
            this.sentinelUnset(targetEl, this.isNavigating);

            resolve('done!');
        });
    }

    updateSentinel() {
        return new Promise((resolve) => {
            this.sentinelTargetList.forEach((el) => {
                el.classList.add('js-obs');
                el.classList.remove('js-nav');
                this.sentinelSet(el);
            });
            resolve('done!');
        });
    }

    setNavigation() {
        return new Promise((resolve) => {
            this.isNavigating = false;
            resolve('done!');
        });
    }

    async navToElViaObs(targetEl, navToEl) {
        this.isNavigating = true;

        try {
            await this.stopObserving(targetEl);
            await navToEl(targetEl);
            await this.updateSentinel();
            await this.setNavigation();
        } catch (error) {
            throw new Error(`error.message ${error.message}`);
        }
    }
}

export default ObserverIntersection;
