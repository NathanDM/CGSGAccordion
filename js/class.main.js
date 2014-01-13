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

            var core = new CGSGNodeSquare(0,0,50,50);
            core.isDraggable=true;
            //create and add a root node to the scene, with arbitrary dimension
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            //Build the accordion.
            this.accordion = new CGSGAccordion(15, 15, 400, 800, 50);

            //Build the section.
            this.titleSection = this._buildTitleSection();
            this.previewSection = this._buildPreviewSection();

            this.rootNode.addChild(this.accordion);

            //The ScrollPane manage the resize
            this.accordion.isDraggable = true;
            this.accordion.isResizable = true;

        },

        _buildTitleSection: function () {

            //Build the core of the section
            var core = new CGSGNodeSquare(0, 0, this.accordion.getWidth(), 300);
            core.color = "blue";
            core.addChild(new CGSGNodeText(20, 10, "I'm the core !"));

            this.accordion.buildAndAddSection("Simple section", null, core);

        },

        _buildPreviewSection: function () {
            //Build the preview of the section
            var preview = new CGSGNodeSquare(0, 0, this.accordion.getWidth(), 65);
            preview.color = "pink";
            preview.addChild(new CGSGNodeText(20, 10, "I'm the preview : \nthis section contain a core"));

            //Build the core of the section
            var core = new CGSGNodeSquare(0, 0, this.accordion.getWidth(), 300);
            core.color = "yellow";
            core.addChild(new CGSGNodeText(20, 10, "I'm the core !"));

            this.accordion.buildAndAddSection("Preview Section", preview, core);
        }
    }
);