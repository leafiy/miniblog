<template>
    <div class="hero">
        <h1 :style="styles">{{text}}</h1>
        <slot></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        text: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            default: 50
        }
    },
    computed: {
        styles() {
            return {
                'font-size': this.size + 'px'
            }
        }
    }
}
</script>