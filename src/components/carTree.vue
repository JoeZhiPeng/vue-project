<template>
   <div>
        <Input v-model="searchText" placeholder="输入搜索内容" clearable  @keyup.native="search($event)" style="width: 200px"/>
        <div v-if="treeDataList && treeDataList.length > 0">
            <Tree :data="treeDataList" v-for="(item,index) in treeDataList" :key="index" show-checkbox multiple></Tree>
        </div>
        <div v-else>没有搜索到相关结果</div>
    </div>
</template>
<script>
    export default {
        props: {
            carList: Array
        },
        data() {
            return {
                searchText: "",
                treeDataList: "",
                oldData: ""//保存原始数据
            };
        },
        watch:{
            searchText(newVal, oldVal){
                if(newVal == ""){
                 this.resizeTree()   
                }
            }
        },
         mounted() {
            this.getTreeData()
        },
        methods: {
            //获取车辆树
            getTreeData() {
                let vm = this
                vm.$instance.post('/proxy/findCarTree').then( res => { 
                    if (res.status == 200 && res.data.data.treeData.length > 0) {
                        vm.treeDataList = res.data.data.treeData
                        vm.oldData = JSON.parse(JSON.stringify(res.data.data.treeData))
                    }
                })
            },

            // 对子节点进行搜索。
            searchEach(node, value){
                let depth = this.getTreeDepth(node);
                let vm = this;
                for (let i = 0; i < depth - 1; i++) {
                    // 记录【删除不匹配搜索内容的叶子节点】操作的次数。
                    // 如果这个变量记录的操作次数为0，表示树形结构中，所有的叶子节点(不包含只有根节点的情况)都匹配搜索内容。那么就没有必要再在循环体里面遍历树了.
                    let spliceCounter = 0; 

                    // 遍历树形结构
                    this.traverseTree(node, n=>{
                        if (vm.isHasChildren(n)) {
                            let children = n.children;
                            let length = children.length;

                            // 找到不匹配搜索内容的叶子节点并删除。为了避免要删除的元素在数组中的索引改变，从后向前循环,
                            // 找到匹配的元素就删除。
                            for (let j = length - 1; j >= 0; j--) {
                                let e3 = children[j];
                                if (!vm.isHasChildren(e3) && e3.title.indexOf(value) <= -1) {
                                    children.splice(j,1);
                                    spliceCounter++;
                                }
                            }
                        }
                    });

                    // 所有的叶子节点都匹配搜索内容，没不再执行循环体了
                    if (spliceCounter == 0) {
                        break;
                    }
                }
            },

            // 搜索框回车事件响应
            search(e){
                let vm = this;
                // 把树形结构还原成搜索以前的。
                vm.treeDataList = JSON.parse(JSON.stringify(vm.oldData));
                if (e.target.value=="") {
                    return;
                }
                if (vm.treeDataList && vm.treeDataList.length > 0) {
                    vm.treeDataList.forEach((n,i,a)=>{
                        vm.searchEach(n, e.target.value);
                    });

                    // 没有叶子节点的根节点也要清理掉
                    let length = vm.treeDataList.length;
                    for (let i = length - 1; i >= 0; i--) {
                        let e2 = vm.treeDataList[i];
                        if (!vm.isHasChildren(e2) && e2.title.indexOf(e.target.value) <= -1) {
                            vm.treeDataList.splice(i, 1);
                        }
                    }
                    this.searchText = e.target.value;
                }
            },

            // 判断树形结构中的一个节点是否具有孩子节点
            isHasChildren(node){
                let flag = false;
                if (node.children && node.children.length > 0) {
                    flag = true;
                }
                return flag;
            },

            // 通过传入根节点获得树的深度，是 calDepth 的调用者。
            getTreeDepth(node){
                if (undefined == node || null == node) {
                    return 0;
                }
                // 返回结果
                let r = 0;
                // 树中当前层节点的集合。
                let currentLevelNodes = [node];
                // 判断当前层是否有节点
                while(currentLevelNodes.length > 0){
                    // 当前层有节点，深度可以加一。
                    r++;
                    // 下一层节点的集合。
                    let nextLevelNodes = new Array();
                    // 找到树中所有的下一层节点，并把这些节点放到 nextLevelNodes 中。
                    for(let i = 0; i < currentLevelNodes.length; i++) {
                        let e = currentLevelNodes[i];
                        if (this.isHasChildren(e)) {
                            nextLevelNodes = nextLevelNodes.concat(e.children);
                        }
                    }
                    // 令当前层节点集合的引用指向下一层节点的集合。
                    currentLevelNodes = nextLevelNodes;
                }
                return r;
            },

            // 非递归遍历树
            traverseTree(node, callback) {
                if (!node) {
                    return;
                }
                var stack = [];
                stack.push(node);
                var tmpNode;
                while (stack.length > 0) {
                    tmpNode = stack.pop();
                    callback(tmpNode);
                    if (tmpNode.children && tmpNode.children.length > 0) {
                        for (let i = tmpNode.children.length - 1; i >= 0; i--) {
                            tmpNode.children[i].expand = true
                            stack.push(tmpNode.children[i]);
                        }
                    }
                }
            },

            //重置树，点击清空按钮
            resizeTree(){
                this.treeDataList = this.oldData
            }
        }
    };
</script>
