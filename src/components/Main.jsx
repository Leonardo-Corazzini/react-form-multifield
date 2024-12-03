
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import Card from "./Card/Card"
import initialPosts from "../posts"
import ModifyForm from './ModifyForm/ModifyForm'

function Main() {
    const [posts, setPosts] = useState(initialPosts)
    const [newTitlePost, setNewTitlePost] = useState('')
    const [newContentPost, setNewContentPost] = useState('')
    const [newTags, setNewTags] = useState([])
    const check = (event) => {

        if (event.target.checked) {
            setNewTags([...newTags, event.target.value])
            console.log(newTags)
        } else {
            setNewTags([])
        }

    };
    function addPost(event) {
        event.preventDefault()
        if (!newTitlePost) {
            return
        }
        const newPost =
        {
            id: Date.now(),
            title: newTitlePost,
            image: 'https://picsum.photos/200/300',
            content: newContentPost,
            tags: newTags,
            published: true,
        }
        setPosts([...posts, newPost])
        setNewTitlePost('')
        setNewContentPost('')
        setNewTags([])

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
                    <input onChange={(e) => setNewTitlePost(e.target.value)} type="text" placeholder="inserisci titolo" value={newTitlePost} />
                    <input onChange={(e) => setNewContentPost(e.target.value)} type="text" placeholder="inserisci contenuto" value={newContentPost} />
                    <input onChange={check} type="checkbox" value="html" />
                    <label> html</label>
                    <input onChange={check} type="checkbox" value="css" />
                    <label > css</label>
                    <input onChange={check} type="checkbox" value="js" />
                    <label > js</label>
                    <input onChange={check} type="checkbox" value="php" />
                    <label > php</label>
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