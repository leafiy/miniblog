<template>
    <div class="split" :class="classes">
        <div class="oval"></div>
        <div class="border-wrap">
            <div class="border"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['color', 'type'],
    computed: {
        styles() {

        },
        classes() {
            return [
                `split-color-${this.color}`, `split-border-${this.type}`
            ]
        }
    }
}
</script>