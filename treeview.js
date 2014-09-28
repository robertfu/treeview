(function(angular) {
  angular
    .module('treeviewApp', [])
    .directive('treeview', ['$compile',
      function($compile) {
        return {
          restrict: 'A',
          scope: {
            nodes: '=treeview',
            getUrl: '&url'
          },
          compile: function(element, attrs) {
            var id = attrs.treeId || 'Id';
            var text = attrs.treeText || 'Name';
            var isFolder = attrs.isFolder || 'IsCategory';
            var childNode = attrs.childNode || 'SubCategoryTrees';
            var idPrefix = 'id';
            var idAppendix = 'sub';
            var currentNode = null;

            var template = '<ul id="{{childId}}">' +
              '<li ng-repeat="node in nodes" id="' + idPrefix + '{{node.' + id + '}}">' +
              '<img ng-src="{{getImage(node)}}" ng-click="expandNode(node, $scope)" />' +
              '<a ng-href="{{getUrl({node:node})}}" ng-click="highlight(node)"><span class={{node.selected}}>{{node.' + text + '}}</span></a></li></ul>';

            return function($scope, $element, $attr) {

              $scope.getImage = function(node) {
                if (!node[isFolder]) {
                  return 'http://cfile23.uf.tistory.com/image/165B663A50C13F4B196CCA';
                }

                if (node.Collapsed) {
                  return 'http://cfile23.uf.tistory.com/image/1459193A50C13F4B1B05FB';
                }

                return 'http://cfile23.uf.tistory.com/image/205B973A50C13F4B19D9BD';
              }

              $scope.expandNode = function(node) {
                node.Collapsed = !node.Collapsed;

                if (!angular.isDefined(node.created)) {
                  node.created = true;
                  var ele = angular.element(document.querySelector('#' + idPrefix + node[id]));
                  var childScore = $scope.$new();
                  childScore.nodes = node[childNode];
                  childScore.childId = idPrefix + node[id] + idAppendix;
                  ele.append($compile(template)(childScore));
                } else {
                  var existingElement = angular.element(document.querySelector('#' + idPrefix + node[id] + idAppendix));
                  var visibility = node.Collapsed ? 'none' : 'block';
                  existingElement.css('display', visibility);
                }
              }

              $scope.highlight = function(node) {
                if (currentNode) {
                  currentNode.selected = null;
                }
                node.selected = 'selected';
                currentNode = node;
              }

              $element.html('').append($compile(template)($scope));
            }

          }
        }
      }
    ])
})(angular)
