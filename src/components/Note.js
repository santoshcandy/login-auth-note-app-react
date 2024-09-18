import React from 'react'
import {   Button,  ListGroup  } from 'react-bootstrap';

const Note = ({note,onDelete}) => {
  return (
    
              <ListGroup.Item key={note.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{note.title}</h5>
                  <p>{note.content}</p>
                </div>
                <Button variant="danger" onClick={() => onDelete(note.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            
    
  )
}

export default Note
