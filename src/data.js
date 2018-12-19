export default function(){
    let arr =[
        {
            title: '学习',
            expand: true,
            selected: true,
            children: [
                {
                    title: '杂志',
                    expand: true,
                    selected: false,
                    children: [
                        {
                            title: '电脑杂志',
                            disableCheckbox: true
                        },
                        {
                            title: '电脑软件'
                        }
                    ]
                }, {
                    title: '电子书',
                    expand: true,
                    children: [
                        {    
                            title: '文学',
                            expand: true,
                            children: [
                                {title: "茶馆"},
                                {title: "红与黑"},
                                {title: "傅雷家书"}
                            ]
                        },
                        {title: '电脑软件' }
                    ]
                }, {
                    title: '纸质书',
                    expand: true,
                    children: [
                        {
                            title: 'leaf 1-2-1',
                            checked: true,
                            expand: true,
                            children: [{
                                title: '电影',
                                expand: true,
                                children:[
                                    { title: '美国电影' },
                                    { title: '日本电影' }
                                ]}  
                            ]
                        },
                        {
                            title: 'leaf 1-2-1'
                        }
                    ]
                }
            ]
        }
    ]
    return arr;
} // end function