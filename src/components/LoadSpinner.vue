<template>
    <div class="flower-spinner">
        <div class="dots-container">
            <div class="bigger-dot">
                <div class="smaller-dot"></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.flower-spinner,
.flower-spinner * {
    box-sizing: border-box;
}

.flower-spinner {
    height: 70px;
    width: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.flower-spinner .dots-container {
    height: calc(70px / 7);
    width: calc(70px / 7);
}

.flower-spinner .smaller-dot {
    background: #0CAF60;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    animation: flower-spinner-smaller-dot-animation 2.5s 0s infinite both;

}

.flower-spinner .bigger-dot {
    background: #0CAF60;
    height: 100%;
    width: 100%;
    padding: 10%;
    border-radius: 50%;
    animation: flower-spinner-bigger-dot-animation 2.5s 0s infinite both;
}

@keyframes flower-spinner-bigger-dot-animation {

    0%,
    100% {
        box-shadow: #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px;
    }

    50% {
        transform: rotate(180deg);
    }

    25%,
    75% {
        box-shadow: #0CAF60 26px 0px 0px,
            #0CAF60 -26px 0px 0px,
            #0CAF60 0px 26px 0px,
            #0CAF60 0px -26px 0px,
            #0CAF60 19px -19px 0px,
            #0CAF60 19px 19px 0px,
            #0CAF60 -19px -19px 0px,
            #0CAF60 -19px 19px 0px;
    }

    100% {
        transform: rotate(360deg);
        box-shadow: #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px;
    }
}

@keyframes flower-spinner-smaller-dot-animation {

    0%,
    100% {
        box-shadow: #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px;
    }

    25%,
    75% {
        box-shadow: #0CAF60 14px 0px 0px,
            #0CAF60 -14px 0px 0px,
            #0CAF60 0px 14px 0px,
            #0CAF60 0px -14px 0px,
            #0CAF60 10px -10px 0px,
            #0CAF60 10px 10px 0px,
            #0CAF60 -10px -10px 0px,
            #0CAF60 -10px 10px 0px;
    }

    100% {
        box-shadow: #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px,
            #0CAF60 0px 0px 0px;
    }
}
</style>