module.exports = {
//set required attributes here
    attributes : {
        date_added : {
            type : 'datetime',
            defaultsTo: function() {return new Date();},
            required : true
        },

        duration : {
            type : 'int',
            required : true
        },
        type : {
            type : 'string',
        },
        description : {
            type : 'string'
        },
        place : {
            type : 'string'
        },
        privacy : {
            type : 'enum'
        }
    },


    CreateTrip : function(data,callback) {
        console.log("==============");
        sails.models.PersonalTrip.create({
            date_added: data.param('date_added'),
            duration : data.param('duration'),
            type : data.param('type'),
            description : data.param('description'),
            place : data.param('place'),
            privacy : data.param('privacy')
        });
    }
};