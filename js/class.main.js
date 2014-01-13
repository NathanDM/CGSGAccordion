var CGMain = CGSGView.extend(
    {
        initialize : function(canvas) {
            this._super(canvas);

            ////// INITIALIZATION /////////
            this.initializeCanvas();
            this.createScene();

            this.startPlaying();
        },

        initializeCanvas : function() {
            //redimensionnement du canvas pour être full viewport en largeur
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         * create a random scene with some nodes
         *
         */
        createScene : function() {

            var i,
                itemSize = 40,
                padding = 5,
                column = 11,
                core = new CGSGNodeSquare(0,0,50,50),
                item;

            core.isDraggable=true;
            //create and add a root node to the scene, with arbitrary dimension
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            //build the component of the section
            this.preview = new CGSGNodeSquare(0,0,100, 100);
            this.preview.color = "magenta";

            this.core = new CGSGNodeSquare(0,0,150,300);
            this.core.color = "blue";

            //Build hte scrollPane
            this.accordion = new CGSGAccordion(15, 15, 400, 800, 50);

            this.accordion.buildAndAddSection("section1", null, this.core);
            this.accordion.buildAndAddSection("section2", this.preview, this.core);
            this.accordion.buildAndAddSection("section3", this.preview, this.core);

            this.rootNode.addChild(this.accordion);

            //The ScrollPane manage the resize
            this.accordion.isDraggable = true;
            this.accordion.isResizable = true;

        }
    }
);