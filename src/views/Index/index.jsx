import React from 'react'
import styles from './index.module.scss'
import { Card, Badge, Table, Icon } from 'antd';
import img from '../../static/image.jpg';
import data from '../../data/data.json';

data.forEach((item, index) => {
    item.key = index
})
const { Column } = Table;

export default class Index extends React.Component {
    state = {
        data,
        isTable: false
    };
    changeTable(isTable) {
        if (this.state.isTable !== isTable) {
            this.setState({ isTable })
        }
    }
    projectStatus(statu) {
        switch (statu) {
            case 'processing':
                return <Badge status="processing" text="进行中" />
            default:
                return <Badge status="error" text="审批中" />
        };
    }
    render() {
        const { data, isTable } = this.state
        return (
            <div className={styles.Index}>
                <div className={styles.topBar}>
                    <div className={styles.tabs}>
                        <span onClick={() => this.changeTable(false)} className={isTable ? {} : styles.act} >卡片</span>
                        <i className={styles.line}></i>
                        <span onClick={() => this.changeTable(true)} className={isTable ? styles.act : {}} >列表</span>
                    </div>
                </div>
                <div className={styles.main}>
                    {!isTable && data.map((item) => {
                        return (
                            <div className={styles.gridItem} key={item.key}>
                                <Card.Grid className={styles.gridBox}>
                                    <div className={styles.content}>
                                        <div className={styles.img}><img src={img} alt="" /></div>
                                        <div className={styles.itemContent}>
                                            <p className={styles.title}><span className={styles.prjName}>{item.prjName}</span>{this.projectStatus(item.projectStatus)}</p>
                                            <p className={styles.prjManager}>{item.prjManager}</p>
                                            <p >立项日期: {item.prjStartDate.split(' ')[0]}</p>
                                            <p className={styles.count}>{item.projectStatus === 'processing' && <><span>任务:{item.taskCount}</span> <span>完成:{item.taskDoneCount}</span><span>进行:{item.taskDoingCount}</span></>}<Icon type="star" theme="filled" style={{ color: '#facc16' }} /></p>
                                        </div>
                                    </div>
                                </Card.Grid>
                            </div>
                        )
                    })}

                    {isTable &&
                        <div className={styles.table}>
                            <Table dataSource={data} pagination={false} >
                                <Column
                                    title=""
                                    width={5}
                                    key="key"
                                    render={() => (
                                        <span>
                                            <Icon type="star" theme="filled" style={{ color: '#facc16' }} />
                                        </span>
                                    )}
                                />
                                <Column
                                    title="所属品类"
                                    dataIndex="productCategory" key="productCategory"
                                    render={productCategory => (
                                        <span>
                                            {productCategory}
                                        </span>
                                    )}
                                />
                                <Column title="项目类别" dataIndex="prjCategory" key="prjCategory" />
                                <Column title="项目编号" />
                                <Column title="项目名称" dataIndex="prjName" key="prjName" />
                                <Column
                                    title="项目状态"
                                    dataIndex="projectStatus" key="projectStatus"
                                    render={projectStatus => (
                                        <span>
                                            {this.projectStatus(projectStatus)}
                                        </span>
                                    )}
                                />
                                <Column title="项目经理" dataIndex="prjManager" key="prjManager" />
                                <Column title="所属部门" dataIndex="department" key="department" />
                                <Column
                                    title="项目计划时间"
                                    render={({ prjStartDate, prjEndDate }) => (
                                        <span>
                                            {prjStartDate.split(' ')[0]}~{prjEndDate.split(' ')[0]}
                                        </span>
                                    )}
                                />
                            </Table>
                        </div>
                    }

                </div>
            </div>
        )
    }
}