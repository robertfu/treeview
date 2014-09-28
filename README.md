Angular Treeview - populated on demand
================

I was working on a Angular project, for which I needed a treeview to show the hierarchy of categories, and a list of products under each category. When the category/product link is clicked, it will open the editor for the category/product. And I found <a href="https://github.com/eu81273/angular.treeview">this one</a> on Github.

After a small modification, it's working. But there is a problem. As it creates all tree nodes at one time, and my project had hundreds of categories and products, it takes tens of seconds to render. So, I needed one to populate the tree nodes on demand to improve the performance. Since I did not find one, I created this one by myself(the credit for the images goes to <a href="https://github.com/eu81273/angular.treeview">https://github.com/eu81273/angular.treeview</a>).



[![ScreenShot](https://github.com/robertfu/robertfu.github.io/blob/master/Images/treeview/desc_small.JPG)](http://plnkr.co/edit/ts1a5ReZtTWlUrDE7heD)

## Installation

Copy the script and css into your project and add a script and link tag to your page.

```html
<script type="text/javascript" src="/treeview.js"></script>
<link rel="stylesheet" type="text/css" href="css/angular.treeview.css">
```

Add a dependency to your application module.

```javascript
angular.module('defaultApp', ['treeviewApp'])
```

## Usage

Attributes of angular treeview are below.

- treeview: the tree model on $scope.
- tree-text : each node's text.
- tree-id : each node's id.
- child-node: each node's children.
- is-folder: whether the node is folder instead of file.
- url: function which returns the url click the node is clicked. The function is passed with the current node.

Here is a simple example.


```html
<div
  treeview="nodes"
	tree-id="Id"
	tree-text="Name"
	is-folder="IsCategory"
	child-node="SubCategoryTrees"
	url="getUrl(node)">
</div>
```

Example model:

```javascript

$scope.nodes = [{
    "Name": "Catalog",
        "Id": "f5af1ca2-f5c8-4732-a656-4027ae354342",
        "IsCategory": true,
        "SubCategoryTrees": [{
            "Name": "Homephone",
            "Id": "401624bf-812f-4e51-9530-0747efdfe70c",
            "IsCategory": true,
            "Collapsed": true,
            "SubCategoryTrees": [{
                "Name": "HomePhoneAccessory",
                "Id": "8f90e105-8dc1-49ed-af44-baeb96e79c9e",
                "IsCategory": true,
                "SubCategoryTrees": [{
                    "Name": "GN Netcom 4800 HiFi Headset",
                    "Id": "7f504d00-c25e-451e-bc0f-2eda8ad8f536",
                    "IsCategory": false,
                    "Collapsed": false,
                    "SubCategoryTrees": []
                }, {
                    "Name": "GN Netcom 9330e Wireless Headset",
                    "Id": "831ea3ce-9e6f-4be5-aff6-09623d226bf5",
                    "IsCategory": false,
                    "Collapsed": false,
                    "SubCategoryTrees": []
                }, {
                    "Name": "50 $ pace Bell Carte-cadeau",
                    "Id": "89d2f7af-15e8-4c56-969e-4db1e8782190",
                    "IsCategory": false,
                    "Collapsed": false,
                    "SubCategoryTrees": []
                }]
			}]
		}]
	}];
		
$scope.getUrl = function(currentNode){
    if (currentNode.IsCategory) {
      return 'http://www.yahoo.com';
    }
    return 'http://www.google.com';
  }
  
```

## Notes:

The image paths in the treeview.js need to be changed accordingly

```javascript
$scope.getImage = function(node) {
	if (!node[isFolder]) {
	  return 'http://cfile23.uf.tistory.com/image/165B663A50C13F4B196CCA';
	}

	if (node.Collapsed) {
	  return 'http://cfile23.uf.tistory.com/image/1459193A50C13F4B1B05FB';
	}

	return 'http://cfile23.uf.tistory.com/image/205B973A50C13F4B19D9BD';
  }
```

## Examples

[![ScreenShot](https://github.com/robertfu/robertfu.github.io/blob/master/Images/treeview/desc_small.JPG)](http://plnkr.co/edit/ts1a5ReZtTWlUrDE7heD)

http://plnkr.co/edit/ts1a5ReZtTWlUrDE7heD
