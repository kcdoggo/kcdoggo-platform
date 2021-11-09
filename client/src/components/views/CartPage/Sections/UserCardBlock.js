import React from 'react'
import './UserCardBlock.css'
function UserCardBlock(props) {


    const renderCartImage = (images) => {
        if(images.length >0){
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map((product,index )=>(
            <tr key={index}>
                <td><img style={{width: '50px'}} alt="상품이미지" src={renderCartImage(product.images)}/> </td>
                <td>{product.quantity}개</td>
                <td>{product.price.toLocaleString("ko-KR")}원</td>
                <td>    
                    <button onClick={()=> props.removeItem(product._id)} style={{borderStyle:'none',borderRadius:'10px',fontWeight:300, cursor:'pointer'}}>remove</button></td>
            </tr>
    ))
    )
            {/**onClick함수에 arrow function 써서 익명함수 호출. */}

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>구매상품</th>
                    <th>수량</th>
                    <th>상품 가격</th>
                    <th>장바구니에서 삭제</th>
                </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
               
            </table>
        </div>
    )
}

export default UserCardBlock
