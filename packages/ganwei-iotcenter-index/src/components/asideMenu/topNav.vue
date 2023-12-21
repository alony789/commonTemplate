<template>
    <div class="top-nav-warpper" id="topNavWarpper">
        <span class="arrow arrow-left iconfont icon-tubiao24_you" v-if="showLeftArrow"
            @click.prevent.stop="arrowClikc('left')"></span>
        <div class="scrollView" id="topNavScrollView">
            <div class="top-nav-container" id="topNavContainer">
                <div class="top-nav-item" :class="{ active: modelValue === item.index }" :id="item.id + item.name"
                    v-for="item in options" :key="item.id" @click="itemClick(item)">
                    <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
                    {{
                        item.name }}
                </div>
            </div>
        </div>
        <span class="arrow arrow-right iconfont icon-tubiao24_you" @click.prevent.stop="arrowClikc('right')"
            v-if="showRightArrow"></span>
    </div>
</template>
<script >
import { onMounted, ref, getCurrentInstance } from 'vue';
export default {
    props: {
        modelValue: {
            type: Number
        },
        options: {
            type: Array
        }
    },
    emits: ['update:modelValue', 'select'],
    setup (props, context) {
        const showLeftArrow = ref(false)
        const showRightArrow = ref(false);
        const time = ref(null)
        const { appContext: { config: { globalProperties } } } = getCurrentInstance()
        globalProperties.$bus.on('topResize', () => {
            updateArrayShow()
        })
        const resize = () => {
            updateArrayShow()
        }
        const updateArrayShow = () => {
            if (time.value) {
                clearTimeout(time.value)
                time.value = null
            }
            time.value = setTimeout(() => {
                const topNavWarpper = document.getElementById('topNavWarpper')
                const topNavContainer = document.getElementById('topNavContainer')
                if (topNavWarpper.clientWidth < topNavContainer.clientWidth) {
                    showLeftArrow.value = true;
                    showRightArrow.value = true
                } else {
                    showLeftArrow.value = false;
                    showRightArrow.value = false
                }
                scrollToView()
            }, 500)
        }
        const scrollToView = () => {
            if (props.options.length) {
                let item = props.options[props.modelValue]
                if (item) {
                    let dom = document.getElementById(`${item.id}${item.name}`)
                    dom.scrollIntoView({ behavior: "smooth" })
                }
            }
        }
        onMounted(() => {
            updateArrayShow()
        })

        const itemClick = (item) => {
            if (item.route && item.route.includes('http') && item.route.includes('target=_blank')) {
                let url = item.route.replace(/\??target=_blank/, '')
                window.open(url)
                return
            }
            context.emit('update:modelValue', item.index)
            context.emit('select', item.index)
            let dom = document.getElementById(`${item.id}${item.name}`)
            dom.scrollIntoView({ behavior: "smooth" })
        }
        const arrowClikc = (type) => {
            const topNavScrollView = document.getElementById('topNavScrollView')
            switch (type) {
                case 'left':
                    topNavScrollView.scrollTo({ left: topNavScrollView.scrollLeft - 200, behavior: "smooth" })
                    break;
                case 'right':
                    topNavScrollView.scrollTo({ left: topNavScrollView.scrollLeft + 200, behavior: "smooth" })
                    break;
                default:
                    break;
            }
        }

        window.addEventListener("resize", () => {
            resize()
        });

        return {
            showLeftArrow, showRightArrow, resize, itemClick, arrowClikc
        }
    }
}

</script>

<style lang="scss" scoped>
.top-nav-warpper {
    display: flex;
    width: calc(100% - 380px);
    min-width: 140px;
    max-width: 840px;
    position: relative;
    // overflow: hidden;
    line-height: 64px;
    user-select: none;

    .arrow {
        display: block;
        font-size: 24px;
        color: var(--menu-color);
        cursor: pointer;
        z-index: 2;
        opacity: 0;
    }

    .scrollView {
        overflow: auto;
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

    &:hover .arrow {
        opacity: 1;
    }

    .arrow-left {
        transform: rotateY(180deg);
        // margin-left: -20px;
        z-index: 10000;
    }
}

::-webkit-scrollbar {
    width: 0px !important;
    height: 0px !important;
}

.top-nav-container {
    display: inline-block;
    line-height: 64px;
    transition: transform 0.3s ease-in-out;

    .top-nav-item {
        display: inline-block;
        font-weight: 400;
        color: var(--menu-color);
        position: relative;
        cursor: pointer;
        padding: 0 20px;

        &:hover {
            // background: var(--top-menu-bg);

            &::after {
                content: '';
                height: 6px;
                width: 100%;
                position: absolute;
                bottom: 0px;
                left: 0px;
                background-color: #3875FF;
            }
        }

        &.active {
            /* background: var(--top-menu-bg); */

            &::after {
                content: '';
                height: 6px;
                width: 100%;
                position: absolute;
                bottom: 0px;
                left: 0px;
                background-color: #3875FF;
            }
        }
    }
}
</style>
