<template>
    <!-- 服务条款 -->
    <div class="mask-layer" v-if="!tosShow">
        <aside class="tos">
            <h3>{{$t('serviceTerms.title.headName')}}</h3>
            <div class="tos-main" v-infinite-scroll="load" infinite-scroll-distance="20">
                <p class="bd">{{$t('serviceTerms.userMustRead')}}</p>
                <h4 class="title">一、{{$t('serviceTerms.contractDefinition')}}</h4>
                <p> 1、 {{$t('serviceTerms.contractDefinitionOne')}}</p>
                <p>2、{{$t('serviceTerms.contractDefinitionTwo')}}</p>
                <h4 class="title">二、{{$t('serviceTerms.intellectualPropertyDecl')}}</h4>
                <p>1.{{$t('serviceTerms.intellectualPropertyDeclOne')}}</p>
                <p> 2.{{$t('serviceTerms.intellectualPropertyDeclTwo')}}</p>
                <p>3.{{$t('serviceTerms.intellectualPropertyDeclThree')}}</p>
                <h4 class="title">三、{{$t('serviceTerms.softwareUsageRules.title')}}</h4>
                <p>1. {{$t('serviceTerms.softwareUsageRules.one.title')}}： </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.one.one')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.one.two')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.one.three')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.one.four')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.one.five')}}。</p>
                <p> 2. {{$t('serviceTerms.softwareUsageRules.nexts[0]')}}。 </p>
                <p>3. {{$t('serviceTerms.softwareUsageRules.nexts[1]')}}。</p>
                <p>4. {{$t('serviceTerms.softwareUsageRules.nexts[2]')}}：</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.nexts[3]')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.nexts[4]')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.nexts[5]')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.nexts[6]')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.nexts[7]')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.nexts[8]')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.nexts[9]')}}；</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('serviceTerms.softwareUsageRules.nexts[10]')}}。</p>
                <h4 class="title">四、{{$t('serviceTerms.userInformation[0]')}}</h4>
                <p>1.{{$t('serviceTerms.userInformation[1]')}}：</p>
                <p>{{$t('serviceTerms.userInformation[2]')}}；</p>
                <p>{{$t('serviceTerms.userInformation[3]')}}；</p>
                <p>{{$t('serviceTerms.userInformation[4]')}}；</p>
                <p>{{$t('serviceTerms.userInformation[5]')}}。</p>
                <p>2.{{$t('serviceTerms.userInformation[6]')}}。</p>
                <h4 class="title">五、{{$t('serviceTerms.userPrivacyStatement[0]')}}</h4>
                <p>一、{{$t('serviceTerms.userPrivacyStatement[1]')}}</p>
                <p>&nbsp;&nbsp;1、{{$t('serviceTerms.userPrivacyStatement[2]')}}：</p>
                <p> &nbsp;&nbsp;&nbsp;&nbsp; 1）{{$t('serviceTerms.userPrivacyStatement[3]')}}。</p>
                <p> &nbsp;&nbsp;&nbsp;&nbsp; 2）{{$t('serviceTerms.userPrivacyStatement[4]')}}。</p>
                <p> &nbsp;&nbsp;&nbsp;&nbsp; 3）{{$t('serviceTerms.userPrivacyStatement[5]')}}。</p>
                <p> &nbsp;&nbsp;&nbsp;&nbsp; 4）{{$t('serviceTerms.userPrivacyStatement[6]')}}。</p>
                <p> &nbsp;&nbsp;&nbsp;&nbsp; 5）{{$t('serviceTerms.userPrivacyStatement[7]')}}。</p>
                <p> &nbsp;&nbsp;&nbsp;&nbsp; 6）{{$t('serviceTerms.userPrivacyStatement[8]')}}。</p>
                <p>
                    &nbsp;&nbsp;2.
                    {{$t('serviceTerms.userPrivacyStatement[9]')}}。
                </p>
                <p>&nbsp;&nbsp;3、{{$t('serviceTerms.userPrivacyStatement[10]')}}。</p>
                <p>二、{{$t('serviceTerms.userBehaviorStandard[0]')}}</p>
                <p>{{$t('serviceTerms.userBehaviorStandard[1]')}}：</p>
                <p>
                    &nbsp;&nbsp;1.
                    {{$t('serviceTerms.userBehaviorStandard[2]')}}。
                </p>
                <p>
                    &nbsp;&nbsp;2.
                    {{$t('serviceTerms.userBehaviorStandard[3]')}}。
                </p>
                <p>
                    &nbsp;&nbsp;3.
                    {{$t('serviceTerms.userBehaviorStandard[4]')}}。
                </p>
                <p>
                    &nbsp;&nbsp;4.
                    {{$t('serviceTerms.userBehaviorStandard[5]')}}。
                </p>
                <p>
                    &nbsp;&nbsp;5.
                    {{$t('serviceTerms.userBehaviorStandard[6]')}}。
                </p>
                <p>
                    &nbsp;&nbsp;6.
                    {{$t('serviceTerms.userBehaviorStandard[7]')}}。
                </p>
                <p>
                    &nbsp;&nbsp;7.
                    {{$t('serviceTerms.userBehaviorStandard[8]')}}。
                </p>
                <h4 class="title">六、{{$t('serviceTerms.disclaimer[0]')}}</h4>
                <p>1. {{$t('serviceTerms.disclaimer[1]')}}。</p>
                <p>2. {{$t('serviceTerms.disclaimer[2]')}}。</p>
                <p>3. {{$t('serviceTerms.disclaimer[3]')}}。</p>
                <p>4. {{$t('serviceTerms.disclaimer[4]')}}。</p>
                <p>5. {{$t('serviceTerms.disclaimer[5]')}}。</p>
                <p>6. {{$t('serviceTerms.disclaimer[6]')}}。</p>
                <p>7. {{$t('serviceTerms.disclaimer[7]')}}。</p>
                <h4 class="title">七、{{$t('serviceTerms.ChangeOfContract[0]')}}</h4>
                <p> 1. {{$t('serviceTerms.ChangeOfContract[1]')}}</p>
                <p> 2. {{$t('serviceTerms.ChangeOfContract[2]')}}</p>
                <h4 class="title">八、{{$t('serviceTerms.liabilityForBreachOfContract[0]')}}</h4>
                <p> {{$t('serviceTerms.liabilityForBreachOfContract[1]')}}</p>
                <h4 class="title">九、{{$t('serviceTerms.licensingOfOtherComponents[0]')}}</h4>
                <p> · {{$t('serviceTerms.licensingOfOtherComponents[1]')}}</p>
                <p> · {{$t('serviceTerms.licensingOfOtherComponents[2]')}}</p>
                <p> · {{$t('serviceTerms.licensingOfOtherComponents[3]')}}</p>
                <p> · {{$t('serviceTerms.licensingOfOtherComponents[4]')}}</p>
                <h4 class="title">十、{{$t('serviceTerms.applicationOfLaw[0]')}}</h4>
                <p>1. {{$t('serviceTerms.applicationOfLaw[1]')}}</p>
                <p>2. {{$t('serviceTerms.applicationOfLaw[2]')}}</p>
            </div>
            <div v-if="bottomBtnShow" class="bottom">
                <el-checkbox @change="agreeChange" v-model="checkedAgree">{{$t('serviceTerms.agree[0]')}}</el-checkbox>
                <span>《{{$t('serviceTerms.title.headName')}}》</span>
                <span v-if="checkedAgree">（{{ agreeTime }}）</span>
            </div>
            <div v-else class="bottom">{{$t('serviceTerms.agree[1]')}}<i class="el-icon-bottom"></i><i class="el-icon-bottom"></i><i class="el-icon-bottom"></i></div>
        </aside>
    </div>
</template>
<script>

export default {
    data () {
        return {
            bottomBtnShow: false,
            checkedAgree: false,
            agreeTime: 5,
            tosShow: false
        };
    },

    methods: {
        load () {
            this.bottomBtnShow = true;
        },
        agreeChange () {
            this.agreeTime = 5;
            if (this.checkedAgree) {
                this.agreeTimeQc = setInterval(() => {
                    this.agreeTime--;
                    if (this.agreeTime == -1) {
                        this.tosShow = true;
                        clearInterval(this.agreeTimeQc);
                    }
                }, 1000);
            } else {
                clearInterval(this.agreeTimeQc);
                this.agreeTime = 5;
                this.tosShow = false;
                this.checkedAgree = false;
            }
        }
    }
};
</script>
<style lang="scss" src="./declaration.scss" scoped>
