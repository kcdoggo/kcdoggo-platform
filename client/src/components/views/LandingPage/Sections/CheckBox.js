import React from 'react'
import { Collapse,Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {
//Fragments를 사용하면 DOM에 별도 노드를 추가하지 않고 자식 목록을 그룹화할 수 있습니다.
    const renderCheckboxLists = () => props.list&& props.list.map((value,index)=>(
        <React.Fragment key={index}>
             <Checkbox onChange>
                 <span>{value.name}</span>
             </Checkbox>
        </React.Fragment>
    ))
    return (
      <div style={{marginBottom:'20px'}}>
           <Collapse defaultActiveKey={['1']} >
                    <Panel header="전자기종" key="1">
                           {renderCheckboxLists()} 
                          <Checkbox >Checkbox</Checkbox>
                    </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
