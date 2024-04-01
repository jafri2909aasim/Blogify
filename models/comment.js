const { schema, model } = require("mongoose");


const commentSchema = new schema(
    {
        content: {
            type: String,
            required: true,
        },
        blog: {
            type: Schema.Types.ObjectId,
            ref: "blog"
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    },
    { timestamps: true }
);

const comment = model("comment", commentSchema);


module.exports = comment;