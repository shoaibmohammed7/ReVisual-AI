"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useMultiImageUpload } from "@/hooks/use-image-upload"   



export default function trainingPage() {
    const {
        images,
        fileInputRef,
        handleThumbnailClick,
        handleFileChange,
        handleRemove
    } = useMultiImageUpload({
        onUpload: (urls) => console.log('Uploaded images:', urls)
    });
    
    
      

    return (
        <div className="flex flex-col justify-center items-center h-screen">
        <Card className="w-[350px]">
        <CardHeader>
        <CardTitle>Model Training</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Model Name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Type</Label>
                <Select>
                    <SelectTrigger id="framework" className="w-full">
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                    <SelectItem value="Man">Man</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Age" />
            </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="ethinicity">Ethinicity</Label>
                    <Select>
                        <SelectTrigger id="ethinicity" className="w-full">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="White">White</SelectItem>
                            <SelectItem value="Black">Black</SelectItem>
                            <SelectItem value="Asian_American">Asian American</SelectItem>
                            <SelectItem value="East_Asian">East Asian</SelectItem>
                            <SelectItem value="South_East_Asian">South East Asian</SelectItem>
                            <SelectItem value="South_Asian">South Asian</SelectItem>
                            <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                            <SelectItem value="Pacific">Pacific</SelectItem>
                            <SelectItem value="Hispanic">Hispanic</SelectItem>
                        </SelectContent>
                    </Select>
        
                </div>
        
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="eyeColor">Eye Color</Label>
                    <Select>
                        <SelectTrigger id="eyeColor" className="w-full">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="Brown">Brown</SelectItem>
                            <SelectItem value="Blue">Blue</SelectItem>
                            <SelectItem value="Hazel">Hazel</SelectItem>
                            <SelectItem value="Gray">Gray</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="bald">Bald</Label>
                    <Switch/>
        
                </div>    
        
            </div>

                     {/* Multiple Image Upload Section */}
                     <div className="flex flex-col space-y-1.5">
                                <Label>Upload Images</Label>
                                <div className="space-y-2">
                                    {images.map((img, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <img src={img.url} alt={img.name} className="w-16 h-16 object-cover rounded" />
                                            <span className="truncate max-w-[150px]">{img.name}</span>
                                            <Button type="button" variant="destructive" onClick={() => handleRemove(index)}>
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <Button type="button" variant="outline" onClick={handleThumbnailClick}>
                                    Add Images
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    multiple
                                />
                            </div>
                     


            </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Train Model</Button>
        </CardFooter>
        </Card>

        </div>
    )
}



