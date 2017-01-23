"use strict";
(function($){
    var getListItemEntity = function(template){
        var strArray = [];
        var index = template.indexOf(">"); 
        strArray.push(template.slice(0, index));
        strArray.push(" dataindex='{dataIndex}'");
        strArray.push(template.slice(index));
        template = strArray.join("");
        
        var Entity =  function(data){
            this.template = template;
            this.data = data;
            this.html = "";
            this.$ele = null
        };
        $.extend(entity.prototype, {
            update: function() {
                var newhtml = this.template.formatStr(this.data);
                if(newhtml == this.html){
                    return;
                }
                this.html = template.formatStr(data);
                var $newEle = $(this.html);
                if(this.$ele){
                    this.$ele.replaceWith($newEle);
                }
                this.$ele = $newEle;
            }
        });
        return Entity;
    };
    var ListAppender = function($container, template, options){
        if(!options){
            options = {};
        }
        this.opt = $.extend({
                size: 5,
                pages: 3,
                datakey: "scrollingData",
                isFromTop: false,
                helperHeight: 30,
                appendHelper: "<div></div>"
            }, options); 
        this.$container = $container;
        this.items = [];
        this.ListItemEntity = getListItemEntity(template);
    };
    $.extend(ListAppender.prototype, {
        isDataNotEnough: function(){
            return this.$container.data(this.opt.datakey).length 
                    <= this.opt.size * this.opt.pages;
        },
        setIndexRangeForInitialize: function(){
            var maxDataIndex = this.$container.data(this.opt.datakey).length - 1;
            var displayLength = this.opt.size * this.opt.pages;
            var start = 0, end = maxDataIndex;
            if(this.opt.isFromTop){
                end = displayLength - 1;
            } else {
                start = maxDataIndex - displayLength + 1;
                start = start < 0 ? 0 : start;
            }
            if(this.isDataNotEnough()){
                start = 0;
                end = maxDataIndex;
            }
            this.$container.setData("currentIndexRange", start + "," + end);
        },
        addDataindexToData: function(){
            var _this =this;
            var data = this.$container.data(this.opt.datakey);
            var exData = [];
            data.forEach(function(data, index){
                exData.push($.extend({dataIndex: index}, data));
                _this.$container.trigger("dataItemChanged", [ exData[index], index ]);
            });
            this.$ele.data(this.opt.datakey, exData);
        },
        deleteUslessItems: function() {
            var length = this.$ele.data(this.opt.datakey).length;
            if(this.item.length <= length){
                return;
            }
            var uslessItems = this.items.splice(length - 1);
            uslessItems.forEach(function(item){
                item.$ele.remove();
                item = null;
            });
        },
        updateItem: function(data, index){
            var item = this.items[index] || new this.ListItemEntity(data);
            item.data = data;
            item.udpate();
            this.items[index] = item;
        },
        removeItemsOutOfRange: function(rangeNeedToBeRemoved){
            for(var i = rangeNeedToBeRemoved.start; i <= rangeNeedToBeRemoved.end; i++){
                this.$container.find("[dataindex='"+ i +"']").remove();
            }
        },
        updateCurrentDisplaying: function(preRange, curRange){
            if(preRange.start === curRange.start ){
                return;
            }
            var rangeNeedToBeRemoved = {start: 0, end: 0};
            if(preRange.start < curRange.start ){
                rangeNeedToBeRemoved.start = preRange.start;
                rangeNeedToBeRemoved.end = curRange.start - 1;
            }
            if(preRange.start > curRange.start ){
                rangeNeedToBeRemoved.start = curRange.end + 1;
                rangeNeedToBeRemoved.end = preRange.end;
            }
            this.removeItemsOutOfRange(rangeNeedToBeRemoved);
            for(var i = curRange.start; i <= curRange.end; i++){
                if(this.$container.find("[dataindex='"+ i +"']").length != 0){
                    continue;
                }
                var $brother = this.$container.find("[dataindex='"+ (i - 1) +"']");
                if($brother.length === 0){
                    this.$container.prepend(this.item[i].$ele);
                }
                $brother = this.$container.find("[dataindex='"+ (i + 1) +"']");
                if($brother.length === 0){
                    this.$container.append(this.item[i].$ele);
                }
            }
        },
        getRangeFromString: function(rangeStr){
            var range = {start: 0, end: 0};
            range.start = rangeStr.split(",")[0] - 0;
            range.end = rangeStr.split(",")[1] - 0;
            return range;
        },
        moveRange: function(delta){
            var currentRange = this.$container.data("currentIndexRange");
            currentRange = this.getRangeFromString(currentRange);
            var newRange = {};
            newRange.start = currentRange.start + this.opt.size*delta;
            newRange.end = currentRange.end + this.opt.size*delta;
            this.$container.setData("currentIndexRange", newRange.start + "," + newRange.end);
        },
        initialize: function(){
            var _this = this;
            this.$container.one("dataUpdated."+this.opt.datakey, function(){
                _this.setIndexRangeForInitialize();
            }).bind("dataUpdated."+this.opt.datakey, function(){
                _this.addDataindexToData();
                _this.deleteUslessItems();
            }).bind("dataUpdated.currentIndexRange", function(e, preRangeString, curRangeString){
                _this.updateCurrentDisplaying(_this.getRangeFromString(preRangeString), _this.getRangeFromString(curRangeString));
            }).bind("dataItemChanged", function(e, data, index){
                _this.updateItem(data, index);
            });
        }
    });
    $.fn.listAppender = function(template, options){
        template = $.trim(template);
        if(this.data("listAppenderInstance")){
            var appender = this.data("listAppenderInstance");
            if(template === "toBefore") {
                appender.moveRange(-1);
            }
            else if(template === "toAfter") {
                appender.moveRange(1);
            } else {
                appender.setIndexRangeForInitialize();
            }
        } else {
            this.data("slistAppenderInstance", new ListAppender(this, template, options));
        }
        return this;
    };
})(jQuery);