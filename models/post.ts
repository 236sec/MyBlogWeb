import mongoose,{ Document, model, models } from 'mongoose';

const PostSchema = new mongoose.Schema({
    user: {
        name: {
            type: String,
            required: [true , "Name is required"],
        },
        image: {
            type: String, 
            require: [true , "Image is required"],
        },
    },
    title: {
        type: String,
        required: [true , "Title is required"],
    },
    tag: {
        type: [String],
        required: false,
    },
    content: {
        type: String,
        required: [true , "Content is required"],
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now,
    },
});

export interface IPost extends Document {
    user: {
        name: string,
        image: string,
    },
    title: string,
    tag: [string],
    content: string,
    createdAt: Date,
    updatedAt: Date,
}

PostSchema.statics.update = async function({ title , tag , content , updatedAt , ...info} : IPost){
    console.log("Checking",info._id,title);
    if(!content || !title ){
        throw new Error("All Fields must be filled");
    }
    const postDoc = await this.findById(info._id);
    if (!postDoc) {
        throw new Error("This post does not exist");
    }
    postDoc.content = content;
    postDoc.title = title;
    postDoc.tag = tag;
    postDoc.updatedAt = Date.now();
    await postDoc.save();
    console.log("Update",info._id, title);
}

PostSchema.statics.create = async function( { user , title , tag , content } : { user: { name: string, image: string }, title: string, tag: [string], content: string } ){
    if(!user || !title || !tag || !content){
        throw new Error("All Fields must be filled")
    }
    const newPost = new this({user,title,tag,content});
    await newPost.save();
    console.log("Created",title);
}


const Posts = models.Posts || model<IPost>('Posts', PostSchema);

export default Posts;