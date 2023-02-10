const mongoose= require('mongoose')

const projectSchema= mongoose.Schema(
    {
        Id: {
            type: Number,
            unique: true
        },
        project_name: {
            type: String,
            default: 'Text'
        },
        open_cost: {
            type: mongoose.Decimal128,
            default: 5
        },
        target_opens: {
            type: Number,
            default: 100
        },
        click_cost: {
            type: mongoose.Decimal128,
            default: 5
        },
        target_clicks: {
            type: Number,
            default: 50
        },
        status: {
            type: Number,
            default: 1
        }

    }
);

const Project =mongoose.model('Project',projectSchema);


const campaignsSchema= mongoose.Schema(
    {
        Id: {
            type: Number,
            unique: true
        },
        project_id: {
            type: Number,
            default: ""
        },
        campaigns_name: {
            type: String,
            default: 'Text'
        },
        opens: {
            type: Number,
            default: 0
        },
        click: {
            type: Number,
            default: 0
        },
        status: {
            type: Boolean,
            default: 1
        }

    }
)


const Campaigns = mongoose.model('Campaigns',campaignsSchema);

module.exports=Project;
module.exports=Campaigns;