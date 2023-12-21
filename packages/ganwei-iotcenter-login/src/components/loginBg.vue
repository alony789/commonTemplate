<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" xmlns:xml="http://www.w3.org/XML/1998/namespace" class="svg-defs">
            <defs>
                <pattern id="image" width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <image xlink:href="@/assets/images/logo-bg.png" width="100" height="100" preserveAspectRatio="none"></image>
                </pattern>
                <g id="shape-butterfly-1">
                    <path stroke="#2161AA" d="M3.24432122,1.20506979 C3.63220421,0.86342311 21.0977587,-2.31680183 41.4762169,10.1113898 C51.6241308,16.3002888 62.5007947,26.3660855 72.2848397,42.6509487 L72.2848397,42.6509487 L72.3323936,42.7301553 C72.7944858,43.5016547 76.5423605,49.7999955 79.9726471,56.8176754 L80.3202546,57.5336303 L80.3202546,57.5336303 L80.4929741,57.8931164 C80.6184957,56.4786864 80.9123142,55.3150426 81.3574338,54.2065828 C81.6880319,53.3722369 82.1407589,52.5937874 82.7000583,51.8957705 C82.439234,51.6841961 82.2183043,51.431248 82.0450783,51.1496873 C81.7649266,50.6943303 81.6095564,50.1642307 81.6112669,49.6131228 C81.6608035,48.785617 81.9315695,48.0371416 82.373954,47.4098961 C82.7272628,46.9089486 83.1900811,46.4852602 83.7369138,46.1749696 C82.9933794,44.1967083 82.143885,42.2581682 81.192767,40.3691159 C80.9194415,39.8311539 80.6391219,39.2797377 80.3253927,38.7103374 C78.0772298,34.5532527 74.3513642,28.8978438 69.3153928,25.6084703 C69.0140672,25.4572029 68.8306246,25.2998472 68.7141461,25.1633571 L68.7141461,25.1633571 L68.0632496,24.4006331 L69.0641005,24.33971 C71.5633935,24.1875748 71.1812898,24.6845333 70.9490261,25.0545636 C75.7581751,28.5248967 79.3179318,33.9509795 81.5206632,38.0209748 C82.0029358,38.9098831 82.4309321,39.767689 82.8267758,40.5778509 C83.6299191,42.2342455 84.3551108,43.9259726 85.0000572,45.6473332 C85.3660532,45.5460283 85.7446544,45.487989 86.1281741,45.4753409 L86.1281741,45.4753409 L86.483535,65.2411827 L86.482963,96.662452 C86.482963,97.8469826 86.2866885,98.9856718 85.9251048,100.047855 C85.8366289,100.30776 85.7375163,100.565256 85.6276129,100.819415 C85.4420839,100.638844 85.2553186,100.435329 85.0653849,100.20406 C84.3314524,99.3104027 83.9948171,98.5437121 83.8050021,97.7407001 C83.6194804,97.1648247 83.4800216,96.5758318 83.387942,95.9792838 L83.387942,95.9792838 L83.2609355,80.3513936 C81.8992265,81.7892617 80.3368114,82.9099409 79.8193822,83.2802168 C77.7733981,84.8345142 75.6683562,86.2659359 73.4860443,87.6497876 L73.4860443,87.6497876 L72.7961234,88.0841273 C67.0880754,91.6521724 60.9769541,94.8547394 57.2031399,96.7515457 L57.2031399,96.7515457 L56.2257015,97.2398589 C54.5458433,98.0739063 53.528634,98.5517082 53.528634,98.5517082 C32.0214144,108.059428 18.2231987,91.5576268 18.2150547,91.5476526 C14.6576461,87.0744082 12.691088,83.1168908 11.7906121,79.662135 C10.6655167,75.3456066 11.1946076,71.7981213 12.3972069,68.9826224 C13.3298106,66.6315653 14.952699,64.2275609 17.6979086,62.1815657 C19.0330263,61.1154027 20.0385134,60.5965521 20.0395619,60.5960104 C20.9236315,60.1405227 21.8490254,59.7428455 22.8085441,59.3982337 L22.764,59.414 L22.5382583,59.1905011 C-1.95150374,34.6158895 1.52725167,11.2512057 1.83669278,9.38540101 L1.84506759,9.335463 C1.91781808,6.55908782 2.41527347,3.83406374 3.24432122,1.20506979 Z"></path>
                </g>
            </defs>
        </svg>

        <section class="scene3d">

            <div class="cube skybox">
                <var class="scale">
                    <figure class="face front"></figure>
                    <figure class="face back"></figure>
                    <figure class="face right"></figure>
                    <figure class="face left"></figure>
                    <figure class="face top"></figure>
                    <figure class="face bottom"></figure>
                </var>
            </div>

            <div class="butterfly_container" style="margin-left: -25%;">
                <var class=" rotate3d">
                <var class="scale">
                    <var class="translate3d">
                        <var class="translate3d-1">
                            <figure class="butterfly">
                                <svg class="wing left" viewBox="0 0 87 103" style="-webkit-animation-duration: 1.75s;
                                    -moz-animation-duration: 1.75s;
                                    -ms-animation-duration: 1.75s;
                                    -o-animation-duration: 1.75s;
                                    animation-duration: 1.75s;">
                                    <use class="left" xlink:href="#shape-butterfly-1"></use>
                                </svg>
                                <svg class="wing right" viewBox="0 0 87 103" style="-webkit-animation-duration: 1.75s;
                                    -moz-animation-duration: 1.75s;
                                    -ms-animation-duration: 1.75s;
                                    -o-animation-duration: 1.75s;
                                    animation-duration: 1.75s;">
                                    <use class="left" xlink:href="#shape-butterfly-1"></use>
                                </svg>
                            </figure>
                        </var>
                    </var>
                </var>
                </var>
            </div>

            <div class="butterfly_container 1" style="margin-top: -150px; margin-left: 15%;
                    -webkit-animation-duration: 5s;
                    -moz-animation-duration: 5s;
                    -ms-animation-duration: 5s;
                    -o-animation-duration: 5s;
                    animation-duration: 5s;">
                <var class="rotate3d">
                    <var class="scale">
                        <var class="translate3d">
                            <var class="translate3d-1">
                                <figure class="butterfly">
                                    <svg class="wing left" viewBox="0 0 87 103" style="-webkit-animation-duration: 3.75s;
                        -moz-animation-duration: 3.75s;
                        -ms-animation-duration: 3.75s;
                        -o-animation-duration: 3.75s;
                        animation-duration: 3.75s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                    <svg class="wing right" viewBox="0 0 87 103" style="-webkit-animation-duration: 3.75s;
                        -moz-animation-duration: 3.75s;
                        -ms-animation-duration: 3.75s;
                        -o-animation-duration: 3.75s;
                        animation-duration: 3.75s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                </figure>
                            </var>
                        </var>
                    </var>
                </var>
            </div>

            <div class="butterfly_container 2 scale_half" style="margin-top: 200px; margin-left: 35%;
                    -webkit-animation-duration: 5s;
                    -moz-animation-duration: 5s;
                    -ms-animation-duration: 5s;
                    -o-animation-duration: 5s;
                    animation-duration: 5s;">
                <var class="rotate3d">
                    <var class="scale">
                        <var class="translate3d">
                            <var class="translate3d-1">
                                <figure class="butterfly">
                                    <svg class="wing left" viewBox="0 0 87 103" style="-webkit-animation-duration: 2.75s;
                        -moz-animation-duration: 2.75s;
                        -ms-animation-duration: 2.75s;
                        -o-animation-duration: 2.75s;
                        animation-duration: 2.75s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                    <svg class="wing right" viewBox="0 0 87 103" style="-webkit-animation-duration: 2.75s;
                        -moz-animation-duration: 2.75s;
                        -ms-animation-duration: 2.75s;
                        -o-animation-duration: 2.75s;
                        animation-duration: 2.75s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                </figure>
                            </var>
                        </var>
                    </var>
                </var>
            </div>

            <div class="butterfly_container 3 scale_half" style="margin-top: 300px; margin-left: -38%;
                    -webkit-animation-duration: 20s;
                    -moz-animation-duration: 20s;
                    -ms-animation-duration: 20s;
                    -o-animation-duration: 20s;
                    animation-duration: 20s;">
                <var class="rotate3d">
                    <var class="scale">
                        <var class="translate3d">
                            <var class="translate3d-1">
                                <figure class="butterfly">
                                    <svg class="wing left" viewBox="0 0 87 103" style="-webkit-animation-duration: 2s;
                        -moz-animation-duration: 2s;
                        -ms-animation-duration: 2s;
                        -o-animation-duration: 2s;
                        animation-duration: 2s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                    <svg class="wing right" viewBox="0 0 87 103" style="-webkit-animation-duration: 2s;
                        -moz-animation-duration: 2s;
                        -ms-animation-duration: 2s;
                        -o-animation-duration: 2s;
                        animation-duration: 2s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                </figure>
                            </var>
                        </var>
                    </var>
                </var>
            </div>

            <div class="butterfly_container 4 scale_half" style="margin-top: -100px; margin-left: 35%;
                    -webkit-animation-duration: 20s;
                    -moz-animation-duration: 20s;
                    -ms-animation-duration: 20s;
                    -o-animation-duration: 20s;
                    animation-duration: 20s;">
                <var class="rotate3d">
                    <var class="scale">
                        <var class="translate3d">
                            <var class="translate3d-1">
                                <figure class="butterfly">
                                    <svg class="wing left" viewBox="0 0 87 103" style="-webkit-animation-duration: 3.2s;
                        -moz-animation-duration: 3.2s;
                        -ms-animation-duration: 3.2s;
                        -o-animation-duration: 3.2s;
                        animation-duration: 3.2s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                    <svg class="wing right" viewBox="0 0 87 103" style="-webkit-animation-duration: 3.2s;
                        -moz-animation-duration: 3.2s;
                        -ms-animation-duration: 3.2s;
                        -o-animation-duration: 3.2s;
                        animation-duration: 3.2s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                </figure>
                            </var>
                        </var>
                    </var>
                </var>
            </div>

            <div class="butterfly_container 4 scale_fourth" style="margin-top: 20px; margin-left: -20%;
                    -webkit-animation-duration: 20s;
                    -moz-animation-duration: 20s;
                    -ms-animation-duration: 20s;
                    -o-animation-duration: 20s;
                    animation-duration: 20s;">
                <var class="rotate3d">
                    <var class="scale">
                        <var class="translate3d">
                            <var class="translate3d-1">
                                <figure class="butterfly">
                                    <svg class="wing left" viewBox="0 0 87 103" style="-webkit-animation-duration: 3.2s;
                        -moz-animation-duration: 3.2s;
                        -ms-animation-duration: 3.2s;
                        -o-animation-duration: 3.2s;
                        animation-duration: 3.2s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                    <svg class="wing right" viewBox="0 0 87 103" style="-webkit-animation-duration: 3.2s;
                        -moz-animation-duration: 3.2s;
                        -ms-animation-duration: 3.2s;
                        -o-animation-duration: 3.2s;
                        animation-duration: 3.2s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                </figure>
                            </var>
                        </var>
                    </var>
                </var>
            </div>

            <div class="butterfly_container 5 scale_third" style="margin-top: -280px;margin-left: -35%;
                    -webkit-animation-duration: 20s;
                    -moz-animation-duration: 20s;
                    -ms-animation-duration: 20s;
                    -o-animation-duration: 20s;
                    animation-duration: 20s;">
                <var class="rotate3d">
                    <var class="scale">
                        <var class="translate3d">
                            <var class="translate3d-1">
                                <figure class="butterfly">
                                    <svg class="wing left" viewBox="0 0 87 103" style="-webkit-animation-duration: 1.35s;
                        -moz-animation-duration: 1.35s;
                        -ms-animation-duration: 1.35s;
                        -o-animation-duration: 1.35s;
                        animation-duration: 1.35s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                    <svg class="wing right" viewBox="0 0 87 103" style="-webkit-animation-duration: 1.35s;
                        -moz-animation-duration: 1.35s;
                        -ms-animation-duration: 1.53s;
                        -o-animation-duration: 1.35s;
                        animation-duration: 1.35s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                </figure>
                            </var>
                        </var>
                    </var>
                </var>
            </div>

            <div class="butterfly_container 6 scale_third" style="margin-top: -320px; margin-left: 30%;
                    -webkit-animation-duration: 4s;
                    -moz-animation-duration: 4s;
                    -ms-animation-duration: 4s;
                    -o-animation-duration: 4s;
                    animation-duration: 4s;">
                <var class="rotate3d">
                    <var class="scale">
                        <var class="translate3d">
                            <var class="translate3d-1">
                                <figure class="butterfly">
                                    <svg class="wing left" viewBox="0 0 87 103" style="-webkit-animation-duration: .45s;
                        -moz-animation-duration: 5.45s;
                        -ms-animation-duration: 5.45s;
                        -o-animation-duration: 5.45s;
                        animation-duration: 5.45s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                    <svg class="wing right" viewBox="0 0 87 103" style="-webkit-animation-duration: .45s;
                        -moz-animation-duration: 5.45s;
                        -ms-animation-duration: 5.45s;
                        -o-animation-duration: 5.45s;
                        animation-duration: 5.45s;">
                                        <use class="left" xlink:href="#shape-butterfly-1"></use>
                                    </svg>
                                </figure>
                            </var>
                        </var>
                    </var>
                </var>
            </div>

        </section>
    </div>
</template>
<style src="@/assets/css/style.css" scoped></style>
