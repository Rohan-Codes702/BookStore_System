import express from 'express';
import { Book } from '../Models/bookModel.js';

const router=express.Router();



router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send("All fields are required");
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear
    };

    const book = await Book.create(newBook);
    return response.status(201).json(book);

  } catch (error) {
    console.log(error);
    return response.status(500).send("Server Error");
  }
});

router.get('/', async(request, response) => {
  try {
    const books=await Book.find({});
    return response.status(200).json({
         count:books.length,
        data:books
    }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send("Server Error");
  }
});

router.get('/:id', async(request, response) => {

  try {
    const {id}=request.params;
    const book=await Book.findById(id) ;
    return response.status(200).json(book);
  } catch (error) {
    console.log(error);
    return response.status(500).send("Server Error");
  }
});


router.put('/:id',async(request,response)=>{
    try{
        if(
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear
        )
        {
           return response.status(400).send("All fields are required");

        }

        const {id}=request.params;

        const result=await Book.findByIdAndUpdate(id,request.body);

        if(!result){
            response.status(404).json("book Not Found");
        }

        return response.status(200).send("Book Updated Successfully")
    }catch(error){
        console.log(error);
        return response.status(500).send("Server Error");
    }
})


router.delete('/:id',async(request,response)=>{

    try {
        
        const {id}=request.params;
        const result=await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(400).json("Book Not find");
        }
            return response.status(200).send("Book Deleted Sucessfully");
    } catch (error) {
        console.log(error);
        return response.status(500).send("Server Error");
    }
})

export default router;