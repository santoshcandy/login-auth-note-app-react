import { useEffect } from 'react'
import api from '../api'

import React, { useState } from 'react';
import { Form, Button, Container, ListGroup, Row, Col } from 'react-bootstrap';
import Note from '../components/Note';
import {  Navigate, useNavigate } from 'react-router-dom';
 

const Home = () => {
   
 const navigate = useNavigate()
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(()=>{
    getNotes();
  },[]);

  const getNotes = () =>{
    api.get('/api/notes/')
    .then((res)=>res.data)
    .then((data)=>{setNotes(data) ;
      console.log(data)})
    .catch((err)=>alert)
  }

 
  const handleAddNote = (e) => {
    e.preventDefault()
        api.post("/api/notes/",{content,title}).then((res)=>{
          if(res.status===201){
            alert("note creatded")
            setTitle('')
            setContent('')
            console.log(res)
            console.log({content, title})

          }else{
            alert('failed to create')
          }
        }).catch(err=>alert(err))
        
        getNotes()
    
  };
  function logout(){
    localStorage.clear()
     navigate('/login/')
    return <Navigate to='/login'/>
  }
  

  const handleDeleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}`).then((res)=>{
      if(res.status===204){
        alert('note deleted')
      }else{
        alert("failed to delete")
      }
      getNotes()
    })
   };

  return (
    <Container className="mt-5">
       <Row>
        <Col md={6}>
          <h2>Create Note</h2>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                name = 'title'
                required
                 onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                value={content}
                required
                name='content'
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddNote}>
              Add Note
            </Button>
          </Form>
        </Col>
        <Col md={6}>


          <h2>Notes</h2>
          <ListGroup>
            
           {notes.map((e)=>(
            <>
             <Note note={e} onDelete={handleDeleteNote} key={e.id} />
            </>
           ))}

            
          </ListGroup>
        </Col>
      </Row>
      <button onClick={logout} className="btn btn-danger">
            Logout
        </button>
    </Container>
  );
}


 

 

export default Home
