import $api from '../request/api.js';
export default {

    data () {
        return {

            pageSize: 25,
            pageNo: 1,
            searchName: '',
            total: 200,
            content: ''
        };
    },

    mounted () {

        this.getList();

    },
    updated () {
        let box = document.getElementById('elTable');
        if (box) {
            this.tableHeight = box.offsetHeight;
        }
    },

    methods: {

        getList () {
            let data = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                searchName: this.searchName
            };

            $api.getZiChanListByPage(data).then((rt) => {
                if (rt.data.code == 200) {
                    this.content = JSON.stringify(rt.data.data)
                   console.log(rt)
                } else {

                }
            }).catch(err => {
                console.log(err)
            });
        }

    }
};