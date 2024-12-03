
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import Card from "./Card/Card"
import initialPosts from "../posts"
import ModifyForm from './ModifyForm/ModifyForm'
const initialFormData = {
    id: Date.now(),
    title: '',
    image: '',
    content: '',
    tags: [],
    published: true,
}
function Main() {
    const [posts, setPosts] = useState(initialPosts)
    const [formData, setFormData] = useState(initialFormData)
    function handlerFormData(e) {
        setFormData((formData) => ({
            ...formData, [e.target.name]: e.target.value
        }))
    }
    function addPost(event) {
        event.preventDefault()


        setPosts([...posts, formData])


    }

    function deletePost(postToDelete) {




        setPosts(posts.filter(post => post !== postToDelete))
    }

    const [clickedCardID, setClickedCardID] = useState(0)
    const [modifyMode, setModifyMode] = useState(false)
    const [modifyTitle, setModifyTitle] = useState('')
    function modifyFormToggle(id) {
        setModifyTitle('')
        setClickedCardID(id)
        setModifyMode(modifyMode ? false : true)
    }
    function confirmModifyForm(post, title) {

        title ? post.title = title : post.title = post.title
        setClickedCardID(0)
        setModifyMode(false)
    }


    return (
        <main>
            <div className="container">
                <form onSubmit={addPost} action="" className="form">
                    <input onChange={handlerFormData} type="text" name='title' placeholder="inserisci titolo" value={formData.name} />
                    <input onChange={handlerFormData} type="text" name='image' placeholder="inserisci percorso immagine" value={formData.image} />


                    <input type="submit" value="aggiungi" />
                </form>
            </div>
            <div className="container">
                <div className="row">
                    {
                        posts.map((post) =>
                            post.published && <div key={post.id} className="col-6 card-container">
                                <div>{clickedCardID === post.id && modifyMode ? <ModifyForm callback={setModifyTitle} title={modifyTitle} callback2={() => confirmModifyForm(post, modifyTitle)} /> : ''}</div>
                                <div onClick={() => modifyFormToggle(post.id)} className='xwrench'><FontAwesomeIcon icon={faWrench} /></div>
                                <div onClick={() => deletePost(post)} className='xmark'><FontAwesomeIcon icon={faXmark} /></div>
                                <Card props={post} />
                            </div>
                        )

                    }

                </div>

            </div>
        </main>
    )

}

export default Main